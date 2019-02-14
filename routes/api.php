<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['throttle:60,1', 'cors'])->group(function () {
	Route::get('/v1/rcheck', 'Controller_API_Registration@check');
});

Route::middleware(['auth:api','activated:api', 'throttle:60,1'])->group(function () {
	Route::post('/public/v1/domains', 'Controller_API_Domains@post');					// create new domain
	Route::put('/public/v1/domains/{id}', 'Controller_API_Domains@put');				// done, description, reorder, delete or undelete context
});