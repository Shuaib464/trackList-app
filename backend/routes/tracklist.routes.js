const express = require('express')

// make a router instance
const router = express.Router();

// import controller
const {createTodo} = require('../controllers/createTodo');
const {getTodosByDay, getTodoById} = require('../controllers/getTodo');
const {updateTodo} = require('../controllers/updateTodo');
const {deleteTodo} = require('../controllers/deleteTodo');
const {createDay} = require('../controllers/createDay')
const {getMonth, getMonthByDate, getMonthById} = require('../controllers/getMonth')


// map the route with the controller
router.post('/createTodo', createTodo)
router.get('/getTodosByDay/:dayId', getTodosByDay);
router.get('/getTodoById/:id', getTodoById);
router.put('/updateTodo/:id', updateTodo)
router.delete('/deleteTodo/:id', deleteTodo)

router.post('/createDay', createDay)
router.get('/getMonth', getMonth)
router.get('/getMonthByDate', getMonthByDate)
router.get('/getMonthById/:monthId', getMonthById)

// export the router 
module.exports = router;