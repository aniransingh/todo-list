import React from 'react'
import Footer from './Footer'
import Header from './Header'
import List from './List'

const ToDoList = () => {
  return (
    <div className='todo-list'>
        <Header />
        <List />
        <Footer />
    </div>
  )
}

export default ToDoList