async function newForumHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="forum-title"]').value;
    
    const initial_message = document.querySelector('input[name="initial-message"]').value;
  
    // Posts the title and initial-message to the database, creating a new forum.
    const response = await fetch(`/api/forums`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        initial_message
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    // If everything's ok, the post is created and displayed on the webpage and dashboard otherwise error
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
}
  
document.querySelector('.new-forum-form').addEventListener('submit', newForumHandler);