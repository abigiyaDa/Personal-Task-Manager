import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Help.css";

const Help = () => {
  return (
    <Navbar>
      <div className="help-page">
        <h1>Help & User Guide</h1>

        <p>
          Welcome to your Personal Task Manager. This guide will help you understand
          how to use the system effectively.
        </p>

        <h2>Getting Started</h2>
        <ul>
          <li>Register a new account using your name, email, and password</li>
          <li>Login using your credentials</li>
          <li>Access your dashboard to manage tasks</li>
        </ul>

        <h2>Managing Tasks</h2>
        <ul>
          <li>Create tasks by clicking "Add Task"</li>
          <li>Edit tasks anytime</li>
          <li>Delete tasks you no longer need</li>
          <li>Mark tasks as completed</li>
        </ul>

        <h2>Categories</h2>
        <ul>
          <li>Create categories to organize tasks</li>
          <li>Assign tasks to categories</li>
          <li>Edit or delete categories</li>
        </ul>

        <h2>Filtering</h2>
        <ul>
          <li>Filter tasks by category or status</li>
          <li>Quickly find what you need</li>
        </ul>

        <h2>Profile Settings</h2>
        <ul>
          <li>Update your name and email</li>
          <li>Changes are saved instantly</li>
        </ul>

        <h2>Need Help?</h2>
        <p>
          If something is not working, try refreshing the page or logging in again.
        </p>
      </div>
    </Navbar>
  );
};

export default Help;