<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use App\Classes\Toolkit;

class RedirectIfNotActivated
{
    public function handle($request, Closure $next, $requestType="")
    {
        if ($requestType == 'api') {
            $user = Auth::guard('api')->user();

            if ((!isset($user)) || ($user->verified == 0)) {
                return response('Unauthorized', 401)
                        ->header('WWW-Authenticate', 'Basic realm=\'Access to the app and related APIs\', charset=\'UTF-8\'');
            }
        } else {
            $pageInfo = Toolkit::pageInfo();
            $user = Auth::user();
            if (isset($user)) {
                if ($user->verified == 0) {
                    return redirect($pageInfo['activate']['path']);
                }
            } else {
                return redirect($pageInfo['login']['path']);
            }
        }

        return $next($request);
    }
}