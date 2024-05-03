import React, { useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
const styleForm = {
  position: 'relative',
  width: '50%',
  margin: '0 auto',
  padding: '20px',
  borderRadius: '15px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  marginTop: '20px',
  marginBottom: '20px',
};

const styleLabel = {
  display: 'block',
};
const styleInput = {
  width: '100%',
  display: 'block',

  padding: '8px ',
  marginBottom: '10px',
  borderRadius: '5px',
  outline: 'none',
  border: '1px solid #ccc',
};
const styleBtn = {
  width: '100%',
  padding: '8px ',
  marginBottom: '10px',
  borderRadius: '5px',
  outline: 'none',
  backgroundColor: 'blue',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s',
};

const ManagerUser = () => {
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
          error: {
            duration: 3000,
            theme: {
              primary: 'red',
              secondary: 'black',
            },
          },
          loading: {
            duration: 500,
            theme: {
              primary: 'yellow',
              secondary: 'black',
            },
          },
        }}
      />
      <Tabs defaultActiveKey="All Users" type="card">
        <Tabs.TabPane tab="All Users" key="1">
          <AllUsers />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Add User" key="2">
          <AddUser />
        </Tabs.TabPane>
        {/* <Tabs.TabPane tab="Edit User" key="3">
          <EditUser />
        </Tabs.TabPane> */}
      </Tabs>
    </>
  );
};
const AllUsers = () => {
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      const tokenAuth = localStorage.getItem('authAdmin');
      const token = JSON.parse(tokenAuth);
      console.log('token', JSON.parse(tokenAuth));
      console.log('tokeAccess', token.accessToken);
      const result = await axios.get('http://localhost:5000/api/user/manage', {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
      // sắp xếp id từ nhỏ tới lớn
      const sortID = result.data.rs.sort((a, b) => a.userId - b.userId);
      result.data.rs = sortID;
      setUsers(result.data.rs);
      // console.log('result', result);
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (_id, name) => {
    if (window.confirm(`Are you sure you want to delete user ${name} ?`)) {
      const tokenAuth = localStorage.getItem('authAdmin');
      const token = JSON.parse(tokenAuth);
      try {
        const result = await axios.delete(
          `http://localhost:5000/api/user/manage/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          }
        );
        if (result.status === 200) {
          toast.success(`Delete user ${name} successfully!`);
          setUsers(Array.from(users).filter((x) => x._id !== _id));
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the user.');
      }
    } else {
      return;
    }
  };

  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState(false);
  const handleCancel = () => {
    setOpen(false);
    setItem(null);
  };
  const handleEdit = (_id) => {
    setOpen(true);
    setItem(_id);
  };
  const styleTable = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const styleTh = {
    textAlign: 'center',
  };

  const styleBtnEdit = {
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  };
  const styleBtnDelete = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <>
      <table style={styleTable}>
        <thead>
          <tr>
            <th style={styleTh}>ID</th>
            <th style={styleTh}>Name</th>
            <th style={styleTh}>Date of birth</th>
            <th style={styleTh}>Address</th>
            <th style={styleTh}>Email</th>
            <th style={styleTh}>Phone</th>
            <th style={styleTh}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={styleTh}>{user.userId}</td>
              <td style={styleTh}>{user.name}</td>
              <td style={styleTh}>{user.birthday}</td>
              <td style={styleTh}>{user.address}</td>
              <td style={styleTh}>{user.email}</td>
              <td style={styleTh}>{user.phone}</td>
              <td style={styleTh}>
                <button
                  style={styleBtnEdit}
                  onClick={() => {
                    handleEdit(user._id);
                    console.log('user', user._id);
                  }}
                >
                  Edit
                </button>
                <button
                  style={styleBtnDelete}
                  onClick={() => {
                    handleDeleteUser(user._id, user.name);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        title="Edit User"
        open={open}
        onCancel={handleCancel}
        closeIcon={false}
        footer={false}
      >
        {item && <ModalEditUser _id={item} />}
        {/* <ModalEditUser _id={item} /> */}
      </Modal>
    </>
  );
};
const ModalEditUser = ({ _id }) => {
  const [userUpdate, setUserUpdate] = React.useState({});
  useEffect(() => {
    const getUserById = async () => {
      const tokenAuth = localStorage.getItem('authAdmin');
      const token = JSON.parse(tokenAuth);
      const result = await axios.get(
        `http://localhost:5000/api/user/manage/one/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );
      setUserUpdate(result.data.rs);
    };
    getUserById();
  }, [_id]);

  const handleSubmit = async (e) => {
    try {
      // e.preventDefault();
      const tokenAuth = localStorage.getItem('authAdmin');
      const token = JSON.parse(tokenAuth);
      const result = await axios.put(
        `http://localhost:5000/api/user/manage/${_id}`,
        userUpdate,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );
      console.log('result', result);
      toast.success(`Edit user ${userUpdate.name} successfully!`);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <form style={styleForm} onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label htmlFor="" style={styleLabel}>
              Name :
            </label>
            <input
              type="text"
              autoFocus
              style={styleInput}
              value={userUpdate?.name}
              onChange={(e) =>
                setUserUpdate({ ...userUpdate, name: e.target.value })
              }
            />
            <label htmlFor="" style={styleLabel}>
              Email :
            </label>
            <input
              type="email"
              placeholder=""
              style={styleInput}
              value={userUpdate?.email}
              onChange={(e) =>
                setUserUpdate({ ...userUpdate, email: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="" style={styleLabel}>
              Date of birth :
            </label>
            <input
              type="text"
              style={styleInput}
              value={userUpdate?.birthday}
              onChange={(e) =>
                setUserUpdate({ ...userUpdate, birthday: e.target.value })
              }
            />
            <label htmlFor="" style={styleLabel}>
              Class
            </label>
            <input
              type="text"
              placeholder=""
              style={styleInput}
              value={userUpdate?.classStudy}
              onChange={(e) =>
                setUserUpdate({ ...userUpdate, classStudy: e.target.value })
              }
            />
            <label htmlFor="" style={styleLabel}>
              Phone :
            </label>
            <input
              type="text"
              placeholder=""
              style={styleInput}
              value={userUpdate?.phone}
              onChange={(e) =>
                setUserUpdate({ ...userUpdate, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="" style={styleLabel}>
              Address :
            </label>
            <input
              type="text"
              placeholder=""
              style={styleInput}
              value={userUpdate?.address}
              onChange={(e) =>
                setUserUpdate({ ...userUpdate, address: e.target.value })
              }
            />
            <label htmlFor="" style={styleLabel}>
              Password :
            </label>
            <input
              type="password"
              placeholder=""
              style={styleInput}
              value={userUpdate?.password}
              onChange={(e) =>
                setUserUpdate({ ...userUpdate, password: e.target.value })
              }
            />
          </div>
          <button type="submit" style={styleBtn}>
            Edit User
          </button>
        </div>
      </form>
    </>
  );
};

const AddUser = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [birthday, setBirthday] = React.useState('');
  const [classStudy, setClassStudy] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    try {
      // e.preventDefault();
      const user = {
        name: name,
        email: email,
        birthday: birthday,
        classStudy: classStudy,
        phone: phone,
        address: address,
        password: password,
      };
      const tokenAuth = localStorage.getItem('auth');
      const token = JSON.parse(tokenAuth);
      const result = await axios.post(
        'http://localhost:5000/api/user/manage',
        user,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );
      console.log('result', result);
      toast.success('Add user successfully!');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <form style={styleForm} onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label htmlFor="" style={styleLabel}>
              Name :
            </label>
            <input
              type="text"
              autoFocus
              style={styleInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="" style={styleLabel}>
              Email :
            </label>
            <input
              type="email"
              placeholder=""
              style={styleInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="" style={styleLabel}>
              Date of birth :
            </label>
            <input
              type="text"
              style={styleInput}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            <label htmlFor="" style={styleLabel}>
              Class
            </label>
            <input
              type="text"
              placeholder=""
              style={styleInput}
              value={classStudy}
              onChange={(e) => setClassStudy(e.target.value)}
            />
            <label htmlFor="" style={styleLabel}>
              Phone :
            </label>
            <input
              type="text"
              placeholder=""
              style={styleInput}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="" style={styleLabel}>
              Address :
            </label>
            <input
              type="text"
              placeholder=""
              style={styleInput}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="" style={styleLabel}>
              Password :
            </label>
            <input
              type="password"
              placeholder=""
              style={styleInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" style={styleBtn}>
            Add User
          </button>
        </div>
      </form>
    </>
  );
};
const EditUser = () => {
  return <div>Edit User</div>;
};

export default ManagerUser;
