import './About.css';
import usersLogo from './assets/user-profile.jpeg';
import userGroupsLogo from './assets/user-group.jpeg';
import roleGroupsLogo from './assets/role-group.jpeg';
import userPermissions from './assets/user-permissions.jpeg';
import rolesLogo from './assets/roles.jpeg';

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
                        <hr className="mt-0 mb-4" />
                        <p>
                            Users are the fundamental building blocks of an RBAC system.
                            They represent individuals or entities requiring access to various resources within an organization's ecosystem.
                            The key aspects of users in an RBAC system include:
                        </p>
                        <ul>
                            <li>
                                <strong>User Identification: </strong>
                                Each user must have a unique identifier (e.g., username or employee ID) for easy tracking and management.
                            </li>
                            <li>
                                <strong>Authentication & Authorization: </strong>
                                Secure and encrypted authentication and authorization mechanisms in place to define
                                which resources or actions a user can access based on their role within the organization.
                            </li>
                        </ul>
                    </div>
                </section>

                <section id="role-groups" class="section">

                    <div class="section-text right">
                        <h1>Roles</h1>
                        <hr className="mt-0 mb-4" />
                        <p>
                            Roles define the set of permissions and responsibilities associated with various job positions
                            or functions within an organization. Roles offer a flexible and scalable way to manage access control
                            by grouping users with similar responsibilities. Key considerations in defining roles include:
                        </p>
                        <ul>
                            <li>
                                <strong>Role Definition: </strong>
                                Roles must be well-defined, indicating what actions and resources are accessible to users
                                assigned to that role.
                            </li>
                            <li>
                                <strong>Role Hierarchy: </strong>
                                Establishing a hierarchy of roles can simplify permission management by allowing more senior roles
                                to inherit permissions from lower-level roles.
                            </li>
                            <li>
                                <strong>Role Assignment: </strong>
                                Users are assigned to roles based on their job functions,
                                and the RBAC system ensures that permissions are consistently applied.
                            </li>
                        </ul>
                    </div>
                    <div class="section-image">
                        <img src={rolesLogo} alt="User Groups" />
                    </div>
                </section>
                <section id="user-groups" class="section">
                    <div class="section-image">
                        <img src={userGroupsLogo} alt="User Groups" />
                    </div>
                    <div class="section-text">
                        <h1>User Groups</h1>
                        <hr className="mt-0 mb-4" />
                        <p>
                            User-Groups are a way to group users who share similar characteristics, roles, or privileges.
                            By categorizing users into groups, organizations can streamline administration and enhance security. Key aspects of user-groups include:
                        </p>
                        <ul>
                            <li>
                                <strong>Group Classication: </strong>
                                User-groups are logical entities of users having similar roles.
                                For example users can be classified by department, project,
                                access level, or any other criteria relevant to the organization.
                            </li>
                            <li>
                                <strong>Group Roles: </strong>
                                Groups can be assigned specific permissions,
                                allowing organizations to efficiently control access for multiple users simultaneously.
                            </li>
                            <li>
                                <strong>Simplified Administration: </strong>
                                Managing user access becomes more efficient as administrators can assign permissions at the group level,
                                reducing the need for individual user configurations.
                            </li>
                        </ul>
                    </div>

                </section>



                <section id="role-groups" class="section right">
                    <div class="section-text">
                        <h1>Role Groups</h1>
                        <hr className="mt-0 mb-4" />
                        <p>
                            Role-Groups represent an advanced layer of access control in RBAC systems.
                            They group roles together, facilitating fine-grained control over the entire role hierarchy.
                            Key considerations when working with role-groups include:
                        </p>
                        <ul>
                            <li>
                                <strong>Role-Group Definition: </strong>
                                Role-groups are typically defined based on common access requirements or project-specific needs.
                            </li>
                            <li>
                                <strong>Role Inheritance: </strong>
                                Permissions can be inherited from role-groups to roles,
                                allowing for centralized management of access control policies.
                            </li>
                            <li>
                                <strong>Fine-Grained Control: </strong>
                                Role-groups enable organizations to set complex permissions that are a combination of multiple roles,
                                enhancing security and flexibility.
                            </li>

                        </ul>
                    </div>
                    <div class="section-image">
                        <img src={roleGroupsLogo} alt="Role Groups" />
                    </div>
                </section>

                <section id="permissions" class="section left">
                    <div class="section-image">
                        <img src={userPermissions} alt="Permissions" />
                    </div>
                    <div class="section-text">
                        <h1>Permissions</h1>
                        <hr className="mt-0 mb-4" />
                        <p>
                            Permissions are the core of an RBAC system, serving as the key identifiers for actions 
                            that users can perform within an organization's ecosystem. 
                            They are a critical component, as they define the precise level of access and control a user has over resources.
                            Key aspects of permissions within an RBAC system include:
                            <ul>
                                <li>
                                    <strong>Permission Definition: </strong>
                                    Permissions should be clearly defined, specifying the actions or operations that a user can execute, such as read, write, delete, or execute.
                                </li>
                                <li>
                                    <strong>Role-Permission Mapping: </strong>
                                    Permissions are typically associated with roles, and the RBAC system manages these associations. Roles are granted permissions, ensuring that users within those roles have access to the specified actions.
                                </li>
                                <li>
                                    <strong>Role-Group and User-Group Permissions: </strong>
                                    As permissions are added to roles, they can be inherited by role-groups and, subsequently, by user-groups. This hierarchy ensures that users within those groups are granted access to perform actions in alignment with their roles.
                                </li>
                            </ul>
                        </p>
                    </div>

                </section>
            </main>
        </div>
    );
}

export default About;