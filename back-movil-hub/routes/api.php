<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);



//rutas protegidas
Route::middleware('jwt.verify')->group(function(){
    Route::get('users', [UserController::class, 'index']);
    //logout
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('/user', [UserController::class, 'findByEmail']);
    Route::put('/userEdit', [UserController::class,'update']);
});
//editar usuario