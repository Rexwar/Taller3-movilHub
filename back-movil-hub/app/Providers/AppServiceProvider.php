<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Validator::extend('cl_rut', function ($attribute, $value, $parameters, $validator) {
            $rut = preg_replace('/[^k0-9]/i', '', $value);
            $dv  = strtolower(substr($rut, -1));
            $numero = substr($rut, 0, strlen($rut)-1);
            $i = 2;
            $suma = 0;
            foreach(array_reverse(str_split($numero)) as $v){
                if($i==8)
                    $i = 2;

                $suma += $v * $i;
                ++$i;
            }

            $dvr = 11 - ($suma % 11);
            
            if($dvr == 11)
                $dvr = 0;
            if($dvr == 10)
                $dvr = 'k';
            if($dvr == strtolower($dv))
                return true;
            
            return false;
        });
    }
}
