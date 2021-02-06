async function editPostFormHandler(event) {
    event.preventDefault();
  
    // This takes whatever's from the entry in post-body
    const post_text = document.querySelector('textarea[name="post-body"]').value.trim();

    // Grabs the ID of the post
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    /*
    There's a couple things happening here, 
    first we're grabbing the post_text, then grabbing the ID of the specific post
    Make sure the post is edited by it's ID.
    PUT (update) the post_text with data from post-body 
    */
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        post_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    /* 
    Note: Dashboard location likely to change
    But if the response is okay it'll update our page, otherwise giving error
    */
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
document.querySelector('.edit-post-form').addEventListener('submit', editPostFormHandler);