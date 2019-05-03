<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRegchecksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('regchecks', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('domain', 255);
            $table->char('licence_key', 30)->nullable();
            $table->string('version', 255)->nullable();
            $table->boolean('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('regchecks');
    }
}