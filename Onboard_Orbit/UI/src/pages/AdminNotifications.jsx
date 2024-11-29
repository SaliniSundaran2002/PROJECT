import React from 'react'

const AdminNotifications = () => {
    return (
        <>

            <div className="bg-white p-6 rounded shadow-md mb-6 text-gray-700">
                <h3 className="text-lg font-semibold mb-4">Create New Notification</h3>
                <form className="space-y-4">
                    <div>
                        <label for="notiid" className="block text-sm font-medium">Notification ID:</label>
                        <input type="text" id="notiid" name="notiid" className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label for="message" className="block text-sm font-medium">Notification Message:</label>
                        <textarea id="message" name="message" rows="4" placeholder="Enter the notification message..." className="w-full p-2 border rounded"></textarea>
                    </div>
                    <div>
                        <label for="notify-type" className="block text-sm font-medium">Notification Type:</label>
                        <select id="notify-type" name="notify-type" className="w-full p-2 border rounded">
                            <option value="general">General</option>
                            <option value="onboarding">Onboarding</option>
                            <option value="training">Training</option>
                            <option value="reminder">Reminder</option>
                        </select>
                    </div>
                    <div>
                        <label for="date" className="block text-sm font-medium">Send Date:</label>
                        <input type="date" id="date" name="date" className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label for="recipient" className="block text-sm font-medium">Send To:</label>
                        <select id="recipient" name="recipient" className="w-full p-2 border rounded">
                            <option value="all">All Employees</option>
                            <option value="se">Software Engineer</option>
                            <option value="ui">UI Designer</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                        Send Notification
                    </button>
                </form>
            </div>

        </>
    )
}

export default AdminNotifications