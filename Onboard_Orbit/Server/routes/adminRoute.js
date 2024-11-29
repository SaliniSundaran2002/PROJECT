const Router = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authenticate = require("../middleware/authenticate.js")
const user = require('../models/User.js')

dotenv.config()
const secretkey = process.env.secretkey

const adminRoute = Router()

adminRoute.get('/', (req, res) => {
    res.status(201).json({ message: "Hello World" })
    console.log("Hi");

})


// const multer = require("multer");

// // Multer configuration for image upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // Save images to an 'uploads' folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname); // Unique file name
//     }
// });

// const upload = multer({ storage });

adminRoute.post('/signup', async (req, res) => {
    try {
        const { FirstName, LastName, Email, Address, PhoneNo, Username, Password, Role } = req.body;


        const existingUser = await user.findOne({ username: Username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists." });
        }
        
        const hashedPassword = await bcrypt.hash(Password, 10);
        console.log("hashed password: ", hashedPassword);
        

        // Create new user
        const newUser = new user({
            firstname: FirstName.trim(),
            lastname: LastName.trim(),
            email: Email,
            address: Address,
            phoneno: PhoneNo,
            username: Username,
            password: hashedPassword,
            role: Role,
        });

        await newUser.save();
        console.log("User successfully registered:", newUser);

        res.status(201).json({ message: "User successfully registered.", user: newUser });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error.", error });
    }
});


// Login
//  create a schema
adminRoute.post('/login', async (req, res) => {
    try {
        const { Username, Password } = req.body;

        const exUsername = await user.findOne({ username: Username });
        if (!exUsername) {
            console.log("Invalid username or password. Please try again");
            return res.status(404).json({ message: "Invalid username or password. Please try again." });
        }
        
        const compPassword = await bcrypt.compare(Password, exUsername.password);
        if (!compPassword) {
            console.log("Invalid username or password.");
            return res.status(404).json({ message: "Invalid username or password. Please try again." });
        }
        const token = jwt.sign({ username: Username, role: exUsername.role }, secretkey, { expiresIn: '24h' });

        res.cookie('AuthToken', token, { httpOnly: true });
        console.log("Token =", token);

        return res.status(200).json({ message: "Successfully logged in" });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


// get User Details

adminRoute.get('/getUsersDetails', authenticate, async (req, res) => {
    try {
        const users = await user.find({}); // Fetch all users
        console.log("User type:", req.role);
        return res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});



// add notification
const notiSchema = mongoose.Schema({
    taskid: { unique: true, type: String },
    taskname: String,
    Details: String
})
const notiModel = mongoose.model("Notification", notiSchema)

adminRoute.post('/addNotification', authenticate, async (req, res) => {
    try {

        if (req.Role == 'admin') {
            const { taskId, taskName, details } = req.body
            const oldTaskid = await notiModel.findOne({ taskid: taskId })
            if (oldTaskid) {
                res.status(404).json({ message: "Already notification added in this taskid" })
                console.log("Already notification added in this notification id");

            } else {
                const notification = new notiModel({
                    taskid: taskId,
                    taskname: taskName,
                    Details: details
                })
                notification.save()
                console.log(notification);

                res.status(200).json({ message: "Successfully notification added!" })
            }
        } else {
            res.status(404).json({ message: "You are not admin" })
        }

    } catch (error) {
        res.status(500).json({ message: "Internal error...." })
    }
})

// Update notification
adminRoute.patch('/updateNotification', authenticate, async (req, res) => {
    try {
        if (req.Role === 'admin') {

            const { taskId, taskName, details } = req.body;
            const oldNotiid = await notiModel.findOne({ taskid: taskId })
            if (!oldNotiid) {
                return res.status(404).json({ message: "No such task found" });
            }

            const notification = await notiModel.updateOne(
                { taskid: taskId },
                {
                    $set: {
                        taskname: taskName,
                        Details: details
                    }
                });


            if (notification.modifiedCount === 0) {
                return res.status(400).json({ message: "No changes made to the task" });
            }
            if (!notification) {
                return res.status(404).json({ message: "Notification not found" });
            }

            res.status(200).json({ message: "Notification updated successfully", notification });

        } else {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

    } catch (error) {
        console.error("Error updating notification:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// delete notification

adminRoute.delete("/deleteNotification/:taskid", authenticate, async (req, res) => {
    try {
        if (req.Role == 'admin') {
            const tid = req.params.taskid
            const deleteNotification = await notiModel.findOne({ taskid: tid })
            if (deleteNotification) {
                await notiModel.deleteOne({ taskid: tid })
                console.log("Successfully deleted");
                return res.status(200).json({ message: "Successfully deleted" })

            }
            return res.status(404).json({ message: "Taskid not found" })
        } else {
            return res.status(404).json({ message: "Access denied. Admins only." })
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})



// add onboard task
// 

const onTaskSchema = mongoose.Schema({
    taskid: { type: String, unique: true },
    taskname: String,
    Description: String,
    Files: String,
    AssignedRole: String,
    DueDate: Date
})

const onTaskModel = mongoose.model("OnboardingTask", onTaskSchema)
adminRoute.post('/onTask', authenticate, async (req, res) => {
    try {
        const { taskId, taskName, description, file, assignedRoles, dueDate } = req.body
        const oldTaskid = await onTaskModel.findOne({ taskid: taskId })
        if (req.Role == 'admin') {

            if (oldTaskid) {
                res.status(404).json({ message: "Olready added in this taskid" })

            } else {
                const onboardTask = new onTaskModel({
                    taskid: taskId,
                    taskname: taskName,
                    Description: description,
                    Files: file,
                    AssignedRole: assignedRoles,
                    DueDate: dueDate
                })
                onboardTask.save()
                console.log(onboardTask);

                res.status(200).json({ message: "Successfully added" })
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Internal error......" })
    }
})

// edit onboarding task

adminRoute.patch("/editTasks", authenticate, async (req, res) => {
    try {
        // Check if the user has admin role
        if (req.Role === 'admin') {
            const { taskId, taskName, description, file, assignedRoles, dueDate } = req.body;

            // Check if the task exists
            const oldTask = await onTaskModel.findOne({ taskid: taskId });
            if (!oldTask) {
                return res.status(404).json({ message: "No such task found" });
            }

            // Update the task in the database
            const updateTask = await onTaskModel.updateOne(
                { taskid: taskId },
                {
                    $set: {
                        taskname: taskName,
                        Description: description,
                        Files: file,
                        AssignedRole: assignedRoles,
                        DueDate: dueDate
                    }
                }
            );


            if (updateTask.modifiedCount === 0) {
                return res.status(400).json({ message: "No changes made to the task" });
            }

            // Send success response
            return res.status(200).json({ message: "Task details updated" });
        } else {
            // If not admin, respond with unauthorized access
            return res.status(403).json({ message: "Unauthorized Access" });
        }
    } catch (error) {
        // Handle any unexpected errors
        return res.status(500).json({ message: "Internal server error..." });
    }
});


// get the Onboarding task

adminRoute.get("/getOnboardingTasks/:tasks", async (req, res) => {
    try {
        const getTask = req.params.tasks
        const tasks = await onTaskModel.find({
            $or: [
                { taskid: getTask },
                { taskname: getTask },
                { Description: getTask }
            ]
        })
        if (tasks.length > 0) {
            res.status(200).json(tasks);
        } else {
            res.status(404).json({ message: "No tasks found with the given criteria." });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error..." })
    }
})



// delete task

adminRoute.delete('/deleteTask/:taskid', authenticate, async (req, res) => {
    try {
        // console.log(req.params.taskid)
        const tid = req.params.taskid

        if (req.Role == 'admin') {
            const deleteTask = await onTaskModel.findOne({ taskid: tid })
            if (deleteTask) {
                await onTaskModel.deleteOne({ taskid: tid })
                res.status(200).json({ message: "Succesfully task deleted" })
                console.log("Succesfully task deleted");

            } else {
                res.status(404).json({ message: "Task id not not found" })
            }

        } else {
            res.status(404).json({ message: "Unauthorized Access" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error...." })
    }
})


// add Training tasks

const trainingSchema = mongoose.Schema({
    Courseid: { type: String, unique: true },
    Ctitle: String,
    description: String,
    objectives: String,
    Duration: String,
    StartDate: Date,
    Format: String,
    Role: String
})

const trainingModel = mongoose.model("TrainingTasks", trainingSchema)

adminRoute.post("/trainingTask", authenticate, async (req, res) => {
    try {
        const { courseId, courseTitle, courseDescription, learningObjectives, duration, startDate, format, role } = req.body
        const oldcourseId = await trainingModel.findOne({ Courseid: courseId })
        if (req.Role == 'admin') {
            if (oldcourseId) {
                res.status(404).json({ message: `Already added in this courseid ${courseId} ` })
            } else {
                const trainingTask = new trainingModel({
                    Courseid: courseId,
                    Ctitle: courseTitle,
                    description: courseDescription,
                    objectives: learningObjectives,
                    Duration: duration,
                    StartDate: startDate,
                    Format: format,
                    Role: role
                })
                trainingTask.save()
                console.log(trainingTask)
                res.status(200).json({ message: "Training task added successfully" })
            }
        } else {
            res.status(404).json({ message: "Unauthorised access" })
        }

    } catch (error) {
        res.status(500).json({ message: "Internal server error...." })
    }
})

// edit training tasks

adminRoute.patch("/editTrainingTask", authenticate, async (req, res) => {
    try {
        // Check user role
        if (req.Role == 'admin') {
            const { courseId, courseTitle, courseDescription, learningObjectives, duration, startDate, format, role } = req.body;
            const oldcid = await trainingModel.findOne({ Courseid: courseId });
            if (!oldcid) {
                return res.status(404).json({ message: "Course ID not found" });
            }
            const updateTrainingTasks = await trainingModel.updateOne(
                { Courseid: courseId },
                {
                    $set: {
                        Ctitle: courseTitle,
                        description: courseDescription,
                        objectives: learningObjectives,
                        Duration: duration,
                        StartDate: startDate,
                        Format: format,
                        Role: role
                    }
                }
            );
            if (updateTrainingTasks.modifiedCount === 0) {
                return res.status(404).json({ message: "Not updated" });
            }
            return res.status(200).json({ message: "Successfully updated" });
            // console.log(updateTrainingTasks);

        }
        return res.status(404).json({ message: "Unauthorized access" });

    } catch (err) {
        console.error(err); // Log error for debugging
        return res.status(500).json({ message: "Internal server error....." });
    }
});


// get the training tasks

adminRoute.get("/getTrainingTasks/:task", async (req, res) => {
    const task = req.params.task;
    const tasks = await trainingModel.find({
        $or: [{ Courseid: task }, { Ctitle: task }, { description: task }, { objectives: task }, { Format: task }]

    })
    if (tasks.length > 0) {
        res.status(200).json({ message: tasks })
    } else {
        res.status(404).json({ message: "No details found" })
    }

})


// delete training task
adminRoute.delete("/deleteTrainingTask/:taskid", authenticate, async (req, res) => {
    try {
        const tid = req.params.taskid

        if (req.Role == 'admin') {
            const deleteTask = await trainingModel.findOne({ Courseid: tid })

            if (deleteTask) {
                await trainingModel.deleteOne({ Courseid: tid })
                console.log("Successfully task deleted");
                return res.status(200).json({ message: "Successfully task deleted" })


            } else {
                return res.status(404).json({ message: "task id not found" })
            }
        }
        return res.status(404).json({ message: "Unauthorised access" })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error.........." })
    }
})


module.exports = adminRoute, user, onTaskModel, trainingModel, notiModel;

// export { adminRoute, user ,onTaskModel,trainingModel,notiModel}