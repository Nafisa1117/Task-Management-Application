package com.masai.controller;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.masai.exception.ResourceNotFoundException;
import com.masai.model.Task;

import com.masai.repository.TaskRepository;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {
	
	@Autowired
	private TaskRepository taskRepo;
	
	//get All Task List
	@GetMapping("/tasks")
	public List<Task> getAllTask(){
		return taskRepo.findAll();
	}
	
	//create Task rest Api
	@PostMapping("/tasks")
	public ResponseEntity<Task> createTask(@RequestBody Task task) {    
		
		
		Task t = taskRepo.save(task);
		
		return new ResponseEntity<Task>(t, HttpStatus.CREATED);
	}
	
	//get task by id rest api
	@GetMapping("/tasks/{id}")
	public ResponseEntity<Task> getTaskById(@PathVariable Long id){
		Task task = taskRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Task is not present with this is: "+id));
	
		return new ResponseEntity<Task>(task, HttpStatus.OK);
	}
	
	//update employee restApi
	@PutMapping("/tasks/{id}")
	public ResponseEntity<Task> updateTask(@PathVariable Long id,@RequestBody  Task taskDetails){
		Task task = taskRepo.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Employee not found with this ID: "+id));
		
		task.setTitle(taskDetails.getTitle());
		task.setDescription(taskDetails.getDescription());
		task.setDueDate(taskDetails.getDueDate());
	task.setCategory(taskDetails.getCategory());
	
	// Update the completion status
	 task.setCompleted(taskDetails.isCompleted());
	    
		Task updateTask = taskRepo.save(task);
		return new ResponseEntity<Task>(updateTask, HttpStatus.OK);
	}
	
	
	//delete employee rest API
	@DeleteMapping("/tasks/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteTask(@PathVariable Long id){
		Task task = taskRepo.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Employee not found with this ID: "+id));
	
		taskRepo.delete(task);
		
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return new ResponseEntity<Map<String,Boolean>>(response, HttpStatus.OK);
	}
	
	//category 
	@GetMapping("/tasks/category")
	public List<Task> getTasksByCategory(@RequestParam String category) {
	    return taskRepo.findByCategory(category);
	    
	}
	

	// Mark a task as completed
	@PutMapping("/tasks/{id}/completed")
	public ResponseEntity<Task> markTaskAsCompleted(@PathVariable Long id) {
	    Task task = taskRepo.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Task not found with this ID: " + id));

	    task.setCompleted(true); // Set the completed property to true
	    Task updatedTask = taskRepo.save(task);

	    return new ResponseEntity<Task>(updatedTask, HttpStatus.OK);
	}


	//search api end point
	@GetMapping("/tasks/search")
	public List<Task> searchTasks(@RequestParam("query") String query) {
	    // Implement search logic based on the query parameter
	    return taskRepo.findByTitleContainingIgnoreCase(query); // Example: Searching by task title
	}




}
