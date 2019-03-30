<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddToUsersTable20190213 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('surname', 255);
            $table->string('company_name', 255)->nullable();
            $table->char('country_code', 3);
            $table->json('domain_ids');
            $table->integer('account_type');
            $table->timestamp('account_expires_at')->useCurrent();
            $table->char('account_licence_key', 30)->nullable();
            $table->integer('domain_count_base');
            $table->integer('domain_count_additional');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('surname');
            $table->dropColumn('company_name');
            $table->dropColumn('country_code');
            $table->dropColumn('domain_ids');
            $table->dropColumn('account_type');
            $table->dropColumn('account_expires_at');
            $table->dropColumn('account_licence_key');
            $table->dropColumn('domain_count_base');
            $table->dropColumn('domain_count_additional');
        });
    }
}
