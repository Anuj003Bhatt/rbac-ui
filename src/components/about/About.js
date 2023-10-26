import './About.css';
import usersLogo from './assets/user-profile.jpeg';
import userGroupsLogo from './assets/user-group.jpeg';
import roleGroupsLogo from './assets/role-group.jpeg';
import userPermissions from './assets/user-permissions.jpeg';

const About = () => {
    return (
        <div>
            <header>
                <h1>Role Based Access Control</h1>
            </header>
            <main>
                <section id="brief">
                    <p>Role-based access control (RBAC) refers to the idea of assigning permissions to users based on their role within an organization. It offers a simple, manageable approach to access management that is less prone to error than assigning permissions to users individually. When using RBAC for Role Management, you analyze the needs of your users and group them into roles based on common responsibilities. You then assign one or more roles to each user and one or more permissions to each role. The user-role and role-permissions relationships make it simple to perform user assignments since users no longer need to be managed individually, but instead have privileges that conform to the permissions assigned to their role(s).</p>
                </section>
                <section id="users" class="section">
                    <div class="section-image">
                        <img src={usersLogo} alt="Users" />
                    </div>
                    <div class="section-text right">
                        <h1>Users</h1>
                        <p>A role definition is a collection of permissions that can be performed, such as read, write, and delete. It's typically just called a role.</p>
                    </div>
                </section>

                <section id="user-groups" class="section">
                    <div class="section-text left">
                        <h1>User Groups</h1>
                        <p>Here are the user groups defined in our RBAC system. User groups help organize users into logical units and facilitate access control management.</p>
                    </div>
                    <div class="section-image">
                        <img src={userGroupsLogo} alt="User Groups" />
                    </div>
                </section>

                <section id="role-groups" class="section right">
                    <div class="section-image">
                        <img src={roleGroupsLogo} alt="Role Groups" />
                    </div>
                    <div class="section-text">
                        <h1>Role Groups</h1>
                        <p>These are the role groups in our RBAC system. Role groups are used to define and manage access permissions for different categories of users.</p>
                    </div>
                </section>

                <section id="permissions" class="section left">
                    <div class="section-text">
                        <h1>Permissions</h1>
                        <p>Here, you can learn about the permissions associated with role groups. Permissions determine what actions users can perform within the system.</p>
                    </div>
                    <div class="section-image">
                        <img src={userPermissions} alt="Permissions" />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default About;