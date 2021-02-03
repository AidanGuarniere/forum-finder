async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value.trim();
    
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    // Make sure the post is edited by it's ID.
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title
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
  
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);