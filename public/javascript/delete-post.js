// Delete the post
async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Fetches the post ID from the APi and then deletes
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    // Take users back to the dashboard
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
