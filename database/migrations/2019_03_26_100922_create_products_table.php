<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use \Carbon\Carbon;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->char('id', 38);
            $table->primary('id');
            $table->timestamps();
            $table->string('description', 255);
            $table->char('currency', 3);
            $table->integer('price_cents')->unsigned();
            $table->softDeletes();
        });

        $now = Carbon::now('UTC');
        DB::table('products')->insert([
            ['id' => '1F9E09C7-2F10-400D-A595-4482D72F4F80', 'created_at' => $now, 'updated_at' => $now, 'description' => 'Additional domain - enterprise', 'currency' => 'USD', 'price_cents' => 1850],
            ['id' => '27349E50-2E5D-4290-A6C1-17587BEA5E35', 'created_at' => $now, 'updated_at' => $now, 'description' => 'Professional', 'currency' => 'USD', 'price_cents' => 10800],
            ['id' => '2E68FB1C-C6A6-4947-961F-9EB94ECC0406', 'created_at' => $now, 'updated_at' => $now, 'description' => 'Additional domain - basic', 'currency' => 'USD', 'price_cents' => 3600],
            ['id' => '8126D38E-F031-4956-B6C6-DD040E1D2776', 'created_at' => $now, 'updated_at' => $now, 'description' => 'Basic', 'currency' => 'USD', 'price_cents' => 3600],
            ['id' => 'BBCE2AC1-35DA-4D86-8B20-1411A5C553E2', 'created_at' => $now, 'updated_at' => $now, 'description' => 'Free trial', 'currency' => 'USD', 'price_cents' => 0],
            ['id' => 'DD264AB7-6E4E-4F33-8BC8-E73138D6F520', 'created_at' => $now, 'updated_at' => $now, 'description' => 'Additional domain - professional', 'currency' => 'USD', 'price_cents' => 2160],
            ['id' => 'E2866B2E-BB05-41B7-B001-C3AEEC6E51FB', 'created_at' => $now, 'updated_at' => $now, 'description' => 'Enterprise', 'currency' => 'USD', 'price_cents' => 64800]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
