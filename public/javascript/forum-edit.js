async function editForumHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="forum-title"]').value;
    
    const initial_message = document.querySelector('input[name="initial-message"]').value;
    
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    // Make sure the forum is edited by it's ID.
    const response = await fetch(`/api/forums/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        initial_message
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    // Once the post is updated, update the post information on the bashboard
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
document.querySelector('.edit-post-form').addEventListener('submit', editForumHandler);