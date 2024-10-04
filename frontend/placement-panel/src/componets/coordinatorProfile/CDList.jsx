import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSearchPlus,
  faPencil,
  faTrashAlt,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const CDList = () => {
  return (
    <>
      <div className="container">
            <div className="main-box clearfix">
              <div className="table-responsive">
                <table className="table user-list">
                  <thead>
                    <tr>
                      <th><span>User</span></th>
                      <th><span>Created</span></th>
                      <th className="text-center"><span>Status</span></th>
                      <th><span>Email</span></th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: 'Ryan Gossling',
                        date: '2013/03/03',
                        status: 'Banned',
                        email: 'jack@nicholson',
                        avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png'
                      },
                      {
                        name: 'Emma Watson',
                        date: '2004/01/24',
                        status: 'Pending',
                        email: 'humphrey@bogart.com',
                        avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png'
                      },
                      {
                        name: 'Robert Downey Jr.',
                        date: '2013/12/31',
                        status: 'Active',
                        email: 'farzanajmal3@gmail.com',
                        avatar: 'https://bootdey.com/img/Content/avatar/avatar6.png'
                      }
                    ].map((user, index) => (
                      <tr key={index}>
                        <td>
                          <img src={user.avatar} alt="" />
                          <a href="#" className="user-link">{user.name}</a>
                          <span className="user-subhead">Registered</span>
                        </td>
                        <td>{user.date}</td>
                        <td className="text-center">
                          <span className={`label label-${user.status === 'Active' ? 'success' : user.status === 'Banned' ? 'danger' : 'warning'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <a href="#">{user.email}</a>
                        </td>
                        <td style={{ width: "20%" }}>
                          <a href="#" className="table-link">
                            <span className="fa-stack">
                              <FontAwesomeIcon icon={faSearchPlus} />
                            </span>
                          </a>
                          <a href="#" className="table-link">
                            <span className="fa-stack">
                              <FontAwesomeIcon icon={faPencil} />
                            </span>
                          </a>
                          <a href="#" className="table-link danger">
                            <span className="fa-stack">
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="pagination pull-right">
                <li><a href="#"><FontAwesomeIcon icon={faChevronLeft} /></a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#"><FontAwesomeIcon icon={faChevronRight} /></a></li>
              </ul>
            </div>
          </div>
    </>
  );
};

export default CDList;
