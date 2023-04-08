const form = document.querySelector('form');
const message = document.getElementById('message');

// add event listener to the form submission
form.addEventListener('submit', function(event) {
  // prevent default form submission behavior
  event.preventDefault();

  // get user input
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  // check if all fields are filled
  if (name === '' || email === '' || date === '' || time === '') {
    message.innerHTML = 'Please fill all fields.';
    return;
  }

  // create a date object for the selected date and time
  const selectedDate = new Date(`${date} ${time}`);

  // check if the selected date is in the future
  if (selectedDate <= new Date()) {
    message.innerHTML = 'Please select a date and time in the future.';
    return;
  }

  // make a POST request to the server to book the appointment
  axios.post('https://crudcrud.com/api/b9ea7f92b8514aada438504bbbaf07d4/VAISHU', {
    name: name,
    email: email,
    date: date,
    time: time
})
     
    // store the appointment details in local storage
   // localStorage.setItem('name', name);
    //localStorage.setItem('email', email);
    //localStorage.setItem('date', date);
    //localStorage.setItem('time', time);
    window.addEventListener('DOMContentLoaded', () => {
      const userDetailsElement = document.getElementById('user-details');
    
      function renderUserDetails(users) {
        // Format each user detail as HTML
        const html = users.map(user => `
          <div class="user-detail" data-id="${user._id}">
            <p>Name: ${user.name}</p>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <span class="delete-icon" title="Delete user">&#x2716;</span>
          </div>
        `).join('');
    
        // Update the user details element with the HTML
        userDetailsElement.innerHTML = html;
    
        // Add event listeners to delete icons
        const deleteIcons = document.querySelectorAll('.delete-icon');
        deleteIcons.forEach(deleteIcon => {
          deleteIcon.addEventListener('click', () => {
            const userDetailElement = deleteIcon.parentElement;
            const userId = userDetailElement.dataset.id;
            deleteUser(userId, userDetailElement);
          });
        });
      }
    
      function deleteUser(userId, userDetailElement) {
        fetch(`https://crudcrud.com/api/b9ea7f92b8514aada438504bbbaf07d4/VAISHU/64314dd0308c9903e84ed1a8`, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              // Remove the user detail element from the page
              userDetailElement.remove();
            } else {
              throw new Error('Failed to delete user');
            }
          })
          .catch(error => {
            console.error(error);
            alert('Failed to delete user');
          });
      }
    
      fetch('https://crudcrud.com/api/b9ea7f92b8514aada438504bbbaf07d4/VAISHU/64314dd0308c9903e84ed1a8')
        .then(response => response.json())
        .then(data => {
          renderUserDetails(data);
        })
        .catch(error => {
          console.error(error);
          userDetailsElement.innerHTML = '<p>Failed to load user details.</p>';
        });
    });
    l