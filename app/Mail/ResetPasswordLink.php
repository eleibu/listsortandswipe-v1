<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Classes\Toolkit;

class ResetPasswordLink extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    public $firstname;
    public $resetLink;
    public $pagePath;

    public function __construct($email, $firstname, $token)
    {
        $pageInfo = Toolkit::pageInfo();
        $this->firstname = $firstname;
        $this->resetLink = url($pageInfo['reset']['path'] . '?email=' . $email . '&token=' . $token);
        $this->pagePath = url($pageInfo['reset']['path']);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Lithiumn List - reset password')->view('emails.reset-password-link');
    }
}