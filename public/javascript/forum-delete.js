// Delete a forum
async function deleteForumHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Fetches the forum ID from the API and then deletes it!
    const response = await fetch(`/api/forums/${id}`, {
        method: 'DELETE'
    });

    // Take users back to the dashboard
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-forum-btn').addEventListener('click', deleteForumHandler);
