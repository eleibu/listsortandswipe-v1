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

Route::get('/docs/{subsection?}', 'Controller_Site@section_docs');
Route::get('/demos/{subsection?}', 'Controller_Site@section_demos');
Route::get('/temp-overview-images', function() {
	return view('temp-overview-images');
});