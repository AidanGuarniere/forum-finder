// Create a new comment
async function commentFormHandler(event) {
    event.preventDefault();

    
    const comment_text = document.querySelector('textarea[name="comment-body"]').nodeValue.trim();
    
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    // Posts stringified items into api.comments
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // If everything works, the documentation reloads with the user input
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText); // Alert user of issue
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);