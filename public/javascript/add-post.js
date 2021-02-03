/* NOTE:
This is set up so that a form is how we add new posts. 
Always subject to change in-case we want to do that.
*/

async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    
    const post_url = document.querySelector('input[name="post-url"]').value;
  
    // Posts the title and post_url to the database, creating a new post.
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_url
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    // If everything's ok, the post is created and displayed on the webpage and dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
}
  
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);