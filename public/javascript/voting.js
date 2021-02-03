async function upvoteClickHandler(event) {
    event.preventDefault();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    // Updates the post_id by adding one upvote
    const response = await fetch ('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        // Reminder: This may result in an unwanted pop-up.
        alert(response.statusText); // Alert user of issue
    }
}

// Reminder: Come back to this section to add a downvote

document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);