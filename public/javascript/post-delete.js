async function deletePostFormHandler(event) {
    event.preventDefault();

    // Grabs the ID of the post
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Deletes the post by it's id
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);