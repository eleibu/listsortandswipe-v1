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

Route::get('/', 'Controller_Site@page_home');
Route::get('/home', 'Controller_Site@page_home')->name('home');
Route::get('/pricing', 'Controller_Site@page_pricing')->name('pricing');
Route::get('/support', 'Controller_Site@page_support')->name('support');
Route::get('/why-lithium-list', 'Controller_Site@page_why_lithium_list')->name('why-lithium-list');

Route::get('/documentation/{subsection?}', 'Controller_Site@section_documentation');
Route::get('/examples/{subsection?}', 'Controller_Site@section_examples');
// Route::get('/temp-overview-images', function() {
// 	return view('temp-overview-images');
// });