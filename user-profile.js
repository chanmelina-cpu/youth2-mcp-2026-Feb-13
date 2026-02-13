class UserProfile extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <style>
        .profile-card {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          text-align: center;
        }
        .profile-avatar-container {
          position: relative;
          width: 150px;
          height: 150px;
          margin: 0 auto 1rem;
        }
        .profile-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
        .upload-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .profile-details h2 {
          margin-bottom: 0.5rem;
        }
        .user-email {
          color: #666;
        }
        .user-bio {
          margin: 1rem 0;
        }
        .edit-btn, .save-btn, .cancel-btn {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
        }
        .form-group {
          margin-bottom: 1rem;
          text-align: left;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
        }
        @media (max-width: 768px) {
          .profile-card {
            padding: 1rem;
          }
          .profile-avatar-container {
            width: 120px;
            height: 120px;
          }
          .upload-btn {
            width: 35px;
            height: 35px;
          }
          .form-actions {
            flex-direction: column;
          }
          .save-btn, .cancel-btn {
            width: 100%;
          }
        }
      </style>
      <div id="profile-info" class="profile-card">
        <div class="profile-avatar-container">
          <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80" alt="User Avatar" class="profile-avatar">
          <button id="upload-avatar-btn" class="upload-btn"><i class="fas fa-camera"></i></button>
        </div>
        <div class="profile-details">
          <h2><span id="user-name"></span></h2>
          <p class="user-email"><span id="user-email"></span></p>
          <p class="user-bio"><span id="user-bio"></span></p>
          <button id="edit-profile-btn" class="edit-btn">Edit Profile</button>
        </div>
      </div>
      <div id="profile-edit-form" class="profile-card" style="display: none;">
        <h2>Edit Profile</h2>
        <form id="profile-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name-input" name="name">
          </div>
          <div class="form-group">
            <label for="bio">Bio</label>
            <textarea id="bio-input" name="bio" rows="3"></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" class="save-btn">Save Changes</button>
            <button type="button" id="cancel-edit-btn" class="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    `;

    shadow.appendChild(wrapper);
  }
}

customElements.define('user-profile', UserProfile);
