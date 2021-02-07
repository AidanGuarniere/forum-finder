// Create a new post
async function postFormHandler(event) {
    event.preventDefault();

    // This takes whatever's from the entry in post-body
    const post_text = document.querySelector('textarea[name="post-body"]').value.trim();

    // Since this is within a specific FORUM, grab the FORUM_ID
    const forum_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    /* 
    We'll be grabbing the forum_id and the post_text.
    post_text will then POST a new data within specific forum
    */
    if (post_text) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                forum_id,
                post_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // If the response works, reload the page with the new user post
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText); // Alert user of an issue
        }
    }
}

document.querySelector('.post-form').addEventListener('submit', postFormHandler)
