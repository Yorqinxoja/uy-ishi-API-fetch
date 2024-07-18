// const $result = document.getElementById("result");  

// fetch("https://dummyjson.com/users")
//  .then(response => response.json())
//  .then(data => renderProducts(data))


// const renderProducts = (data) => {
//     data.users.forEach(product => {
//         console.log(product)
//         const $div = document.createElement("div");
//         $div.innerHTML = `
//         <img width="300" src="${product.image}" />
//         `

//         $result.appendChild($div);
//     })
// }



document.addEventListener('DOMContentLoaded', function() {
    const userCardsContainer = document.getElementById('user-cards');
    const loadingSpinner = document.getElementById('loading');
  
    function createUserCard(user) {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${user.image}" />
        <h3>${user.firstName} ${user.lastName}</h3>
        <p>Age: ${user.age}</p>
        <button onclick="deleteUser(${user.id}, this)">Delete</button>
      `;
      return card;
    }
  

    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(data => {
        loadingSpinner.style.display = 'none'; 
        const users = data.users;
        users.forEach(user => {
          const userCard = createUserCard(user);
          userCardsContainer.appendChild(userCard);
        });
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        loadingSpinner.textContent = 'Failed to load users.';
      });
  });
  
  
  function deleteUser(userId, button) {
    if (confirm('Are you sure you want to delete this user?')) {
      button.textContent = 'Deleting..!';
      button.disabled = true;
      fetch(`https://dummyjson.com/users/${userId}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          console.log('Deleted user:', data);
          const card = button.parentElement;
          card.remove();
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          button.textContent = 'Delete';
          button.disabled = false;
          alert('Failed to delete user.');
        });
    }
  }
  