<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Validation\Rule;

use function Laravel\Prompts\error;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        
        // Encontrar el usuario
        $user = JWTAuth::user();
        try {
            // Mensajes de error personalizados para las reglas de validación
            $rules = [
                'name' => 'sometimes|string|min:10|max:150',
                'email' => [
                    'sometimes',
                    'email',
                    'max:100',
                    Rule::unique('users')->ignore($user->id),
                    'regex:/^([a-zA-Z0-9_.+-]+)@((ucn.cl)|(alumnos.ucn.cl)|(disc.ucn.cl)|(ce.ucn.cl))$/'
                ],
                'birthdate' => ['sometimes', 'regex:/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/'],
                
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

            // Validar los datos que se reciben

            try {
                $validatedData = $request->validate($rules, $messages);
    
            } catch (\Illuminate\Validation\ValidationException $e) {
                return response()->json($e->errors(), 400);
            }

            if (!$user) {
                return response()->json(['error' => 'Usuario no encontrado o no autenticado'], 404);
            }

            // Actualizar los campos proporcionados
            $user->fill($validatedData);

            // Si se proporciona una nueva contraseña, encriptarla
            if ($request->has('password')) {
                $user->password = bcrypt($validatedData['password']);
            }

            $user->save();

            return response()->json($user, 201);
        } catch (\Exception $e) {
            // Manejo de excepciones
            return response()->json([
                'error' => 'Error al procesar la solicitud',
                'message' => $e
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function findByEmail(Request $request)
    {
        // Obtener el correo electrónico de la solicitud
        $email = $request->query('email');

        // Buscar el usuario por correo electrónico
        $user = User::where('email', $email)->first();

        // Verificar si se encontró el usuario
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json($user);
    }
}
