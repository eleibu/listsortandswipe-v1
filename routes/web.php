<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', 'Controller_Site@page_home');
Route::get('/home', 'Controller_Site@page_home')->name('home');
Route::get('/pricing', 'Controller_Site@page_pricing')->name('pricing');
Route::get('/about', 'Controller_Site@page_about');
Route::get('/why-lithium-list', 'Controller_Site@page_why_lithium_list')->name('why-lithium-list');
Route::get('/terms', 'Controller_Site@page_terms')->name('terms');
Route::get('/privacy', 'Controller_Site@page_privacy')->name('privacy');
Route::get('/documentation/{subsection?}', 'Controller_Site@section_documentation');
Route::get('/examples/{subsection?}', 'Controller_Site@section_examples');
Route::get('/browser-support', 'Controller_Site@page_browser_support');
Route::get('/upcoming-features', 'Controller_Site@page_upcoming_features');

Route::get('/support', 'Controller_Support@page')->name('support');
Route::post('/support', 'Controller_Support@post');

Route::middleware(['auth', 'activated'])->group(function () {
	Route::get('/console', 'Controller_Site@page_console');
});

// auth
Route::get('/login', 'Controller_Auth_LogIn@page')->name('login');
Route::post('/login', 'Controller_Auth_LogIn@post');
Route::get('/signup', 'Controller_Auth_SignUp@page')->name('signup');
Route::post('/signup', 'Controller_Auth_SignUp@post');
Route::get('/activate/{code?}', 'Controller_Auth_Activate@page')->name('activate');
Route::post('/activate', 'Controller_Auth_Activate@post');
Route::get('/reset', 'Controller_Auth_Reset@page')->name('reset');
Route::post('/reset', 'Controller_Auth_Reset@post');
Route::get('/signout', 'Controller_Auth_SignOut@page')->name('signout');