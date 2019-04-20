<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class LogFailureAfterCharge extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    public $user;
    public $invoice;
    public $controllerName;
    public $errorId;

    public function __construct($user, $invoice, $controllerName, $errorId)
    {
        $this->user = $user;
        $this->invoice = $invoice;
        $this->controllerName = $controllerName;
        $this->errorId = $errorId;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('LOG FAILURE AFTER CHARGE!')->view('emails.log-failure-after-charge');
    }
}