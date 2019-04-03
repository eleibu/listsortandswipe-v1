<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Classes\Toolkit;

class ResendActivationLink extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    public $firstname;
    public $activateLink;

    public function __construct($firstname, $vcode)
    {
        $pageInfo = Toolkit::pageInfo();
        $this->firstname = $firstname;
        $this->activateLink = url($pageInfo['activate']['path'] . '/' . $vcode);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Lithiumn List - activate account')->view('emails.resend-activation-link');
    }
}