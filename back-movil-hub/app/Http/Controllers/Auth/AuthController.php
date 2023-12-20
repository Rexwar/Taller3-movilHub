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

        $rules = [
            'name' => 'required|string|min:10|max:150',
            'email' => [
                'required',
                'email',
                'max:100',
                'unique:users',
                'regex:/^([a-zA-Z0-9_.+-]+)@((ucn.cl)|(alumnos.ucn.cl)|(disc.ucn.cl)|(ce.ucn.cl))$/'
            ],
            'birthdate' => ['required','regex:/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/'],
            'rut' => [
                'required',
                'string',
                'max:12',
                'unique:users',
                'cl_rut',
                'regex:/^\d{1,3}(?:\.\d{1,3}){2}-[\dkK]$/i'
            ],
        ];

        // Mensajes de error personalizados para las reglas de validación
        $messages = [
            'rut.unique' => 'El RUT ya está registrado.',
            'email.unique' => 'El correo ya está registrado.',
            'name.required' => 'El nombre es obligatorio.',
            'email.regex' => 'El correo debe pertenecer al dominio UCN.',
            'rut.cl_rut' => 'El RUT no es válido o no tiene un dígito verificador correcto.',
            'email.required' => 'El correo es obligatorio.',
            'birthdate.required' => 'La fecha de nacimiento es obligatoria.',
            'rut.required' => 'El RUT es obligatorio.',
            'name.required' => 'El nombre es obligatorio.',
            'email.email' => 'El correo debe ser válido.',
            'name.min' => 'El nombre debe tener al menos 10 caracteres.',
            'rut.regex' => 'El RUT debe contener puntos y guion.',
            'birthdate.regex' => 'La fecha de nacimiento debe estar en el formato DD/MM/AAAA.',
        ];



        try {
            $request->validate($rules, $messages);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json($e->errors(), 400);
        }
        $cleanRut = str_replace(['.', '-'], '', $request->rut);
        $cleanRut = substr($cleanRut, 0, -1);

        //creamos el usuario
        //el metodo create recibe un array con los datos del usuario y lo crea en la base de datos
        //create es de la clase Model
        $user = User::create([
            'name' => $request->name,
            'rut' => $request->rut,
            'email' => $request->email,
            'birthdate' => $request->birthdate,
            //encriptamos la contraseña
            'password' => Hash::make($cleanRut),
        ]);

        $token = JwTAuth::fromUser($user);

        //lo que hace el return es devolver un json con el correo del usuario creado y el token de autenticacion
        return response()->json([
            'email' => $user->email,
            'token' => $token,
            'id' => $user->id
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        //validamos la data recibida para el login

        $credentials = $request->only('email', 'password');

        try {
            //si las credenciales son correctas
            //el metodo attempt recibe un array con las credenciales del usuario y devuelve un token de autenticacion
            //attempt es de la clase JWTAuth y es la que se encarga de crear el token
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'error' => 'invalid_credentials'
                ], 400);
            }
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'could_not_create_token'
            ], 500);
        }
        return response()->json(compact('token'));
    }
    public function logout()
    {
        //eliminamos el token de autenticacion con este codigo 
        JWTAuth::invalidate(JWTAuth::getToken());

        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function checkToken(Request $request)
    {
        $token = $request->bearerToken(); // Obtén el token del encabezado Authorization

        if (!$token) {
            return response()->json(['message' => 'Token no proporcionado'], 401);
        }

        try {
            // Intenta verificar el token
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                return response()->json(['message' => 'Token inválido'], 401);
            }

            return response()->json(['message' => 'Token válido'], 200);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Error al verificar el token'], 500);
        }
    }
}
