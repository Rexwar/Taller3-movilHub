<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;


class AuthController extends Controller
{
    //registrar usuario con autenticacion
    public function register(Request $request)
    {
        //validamos la data recibida para registro
        //el confirmed de password se encarga de solicitar el campo de confirmacion de contraseña para el registro
        //lo que realiza internamente es buscar un campo llamado password_confirmation y compararlo con el campo password
        try {
            $this->validate($request, [
                'name' => 'required|string',
                'email' => 'required|email|max:100|unique:users',
                'birthdate' => 'required|date',
                'rut' => 'required|string|max:12',
            ]);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json($e->errors(), 400);
        }

        //creamos el usuario
        //el metodo create recibe un array con los datos del usuario y lo crea en la base de datos
        //create es de la clase Model
        $user = User::create([
            'name' => $request->name,
            'rut' => $request->rut,
            'email' => $request->email,
            'birthdate' => $request->birthdate,
            //encriptamos la contraseña
            'password' => Hash::make($request->rut),
        ]);

        $token = JwTAuth::fromUser($user);

        //lo que hace el return es devolver un json con el correo del usuario creado y el token de autenticacion
        return response()->json([
            'email' => $user->email,
            'token' => $token,
            'id' => $user->id
        ], 201);
    }

    public function login(LoginRequest $request){
        //validamos la data recibida para el login
        
        $credentials = $request->only('email', 'password');

        try{
            //si las credenciales son correctas
            //el metodo attempt recibe un array con las credenciales del usuario y devuelve un token de autenticacion
            //attempt es de la clase JWTAuth y es la que se encarga de crear el token
            if(!$token = JWTAuth::attempt($credentials)){
                return response()->json([
                    'error' => 'invalid_credentials'
                ], 400);
            }
        }catch(JWTException $e){
            return response()->json([
                'error' => 'could_not_create_token'
            ], 500);

        }
        return response()->json(compact('token'));
    }
    public function logout() {
        //eliminamos el token de autenticacion con este codigo 
        JWTAuth::invalidate(JWTAuth::getToken());

        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
}
