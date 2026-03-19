<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/user/login', [RegisterController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function() {

    // Profile
    Route::post('/create/profile', [ProfileController::class,'CreateProfile']);
    Route::post('/create/about', [AboutController::class,'CreateAbout']);
    Route::get('/get/data/{user_id}', [ProfileController::class, 'getProfile']);
    Route::get('/get/about/{user_id}', [AboutController::class, 'getAbout']);

    // Experience
    Route::post('/create/experience', [ExperienceController::class, 'store']);
    Route::put('/update/experience/{id}', [ExperienceController::class, 'update']);
    Route::get('/get/experience/{user_id}', [ExperienceController::class, 'getByUser']);
    Route::delete('/delete/experience/{id}', [ExperienceController::class, 'destroy']);

    // Posts
    Route::post('/create/post', [PostController::class , 'store']);
    Route::get('/get/post/{postId}', [PostController::class , 'get']);
    Route::get('/get/user/posts/{userId}', [PostController::class , 'getParticularUserPosts']);
    Route::delete('/delete/post/{postId}', [PostController::class , 'delete']);

    // Users
    Route::get('/user', [UserController::class ,'getAll']);
    Route::get('/get/user/{id}', [UserController::class ,'getParticularUser']);

});