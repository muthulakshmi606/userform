import React, { useState } from 'react';
import Grid                from '@mui/material/Grid';
import Radio               from '@mui/material/Radio';
import moment              from 'moment';
import RadioGroup          from '@mui/material/RadioGroup';
import { DatePicker,
    LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment }   from '@mui/x-date-pickers/AdapterMoment'
import { Button, 
    FormControl,
    FormControlLabel, 
    InputLabel, 
    MenuItem,
    Select,  
    TextField 
} from '@mui/material';
import student from '../studentDetails/student';
import { ToastContainer, toast } from 'react-toastify';
import { StudentsDetails } from './data';
import 'react-toastify/dist/ReactToastify.css';
const Login=()=>{
    const notifyDelete = () => toast("Record Deleted!");
    const notifyAdd = () => toast("Record Added!");
    const notifyEdit = () => toast("Record Updated!");

    const [searchText, setSearchText] = useState('');
    const [students, setStudents] = useState(StudentsDetails);
    const [newStudent, setNewStudent] = useState({id: '',Name: '',Age: '',TotalMarks: '',Rank: ''});
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    console.log(students);
    const handleSearch = (e) => {
        setSearchText(e.target.value.toLowerCase());
    }

    // Delete Student From Table
    const handleDelete = (Id) => {
        notifyDelete();
        setStudents(prevStudents => prevStudents.filter(student => student.id !== Id));
    }

    // Handle input change for new student
    const handleAddStudent = (e) => {
        const { name, value } = e.target;
        setNewStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

     // Add or Edit student
     const addOrEditStudent = (e) => {
        e.preventDefault();
        if (isEditing) {
            setStudents(prevStudents => prevStudents.map(student => 
                student.id === editId ? newStudent : student
            ));
            notifyEdit();
            setIsEditing(false);
            setEditId(null);
        } else {
            setStudents(prevStudents => [...prevStudents, newStudent]);
            notifyAdd();
        }
        setNewStudent({id: '',Name: '',Age: '',TotalMarks: '',Rank: ''});
    }

    // Edit Student
    const handleEdit = (student) => {
        setIsEditing(true);
        setEditId(student.id);
        setNewStudent(student);
    }

    const filteredStudents = students
        .filter(std => std.Name.toLowerCase().includes(searchText))
        .map((filteredstudent, index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{filteredstudent.Name}</td>
                <td>{filteredstudent.Age}</td>
                <td>{filteredstudent.TotalMarks}</td>
                <td>{filteredstudent.Rank}</td>
                <td>
                    <button onClick={() => handleEdit(filteredstudent)} id='editButton' style={{marginRight:"20px"}}>Edit</button>
                    <button onClick={() => handleDelete(filteredstudent.id)} id='deleteButton'>Delete</button>
                </td>
            </tr>
     ));

    return(
        <div>
            <div id='header'>
                <div class="form-container">
                    <h1 style={{fontFamily:"emoji"}}>{isEditing ? "Edit Student" : "Add New Student"}</h1>
                    <form onSubmit={addOrEditStudent} >
                    <label htmlFor='id'>ID : </label>
                        <input
                            type='text'
                            placeholder='Enter Student Id'
                            onChange={handleAddStudent}
                            value={newStudent.id}
                            name='id'
                            disabled={isEditing}
                        />
                         <label htmlFor='Name'>NAME : </label>
                        <input
                            type='text'
                            placeholder='Enter Student Name'
                            onChange={handleAddStudent}
                            value={newStudent.Name}
                            name='Name'
                        /><br/>

                        <label htmlFor='Age'>AGE : </label>
                        <input
                            type='text'
                            placeholder='Enter Student Age'
                            onChange={handleAddStudent}
                            value={newStudent.Age}
                            name='Age'
                        />
                           <label htmlFor='TotalMarks'>TOTAL_MARKS : </label>
                        <input
                            type='text'
                            placeholder='Enter Student Marks'
                            onChange={handleAddStudent}
                            value={newStudent.TotalMarks}
                            name='TotalMarks'
                        /><br/>
                        
                        <label htmlFor='Rank'>RANK : </label>
                        <input
                            type='text'
                            placeholder='Enter Student Rank'
                            onChange={handleAddStudent}
                            value={newStudent.Rank}
                            name='Rank'
                        />
                        <button type='submit' id='addButton'>{isEditing ? "Update Student" : "Add Student"}</button>
                    </form>

                </div>
                <div>
                    <label>Search Student : </label>
                    <input
                        type='text'
                        placeholder='Enter Student Name...'
                        value={searchText}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <h1 style={{textAlign:'center',fontFamily:"emoji"}} >STUDENTS DETAILS</h1>

            <table class="table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>TotalMarks</th>
                        <th>Rank</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents}
                </tbody>
            </table>

            <div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />

            </div>
        </div>

        
    )
    }
export default Login



