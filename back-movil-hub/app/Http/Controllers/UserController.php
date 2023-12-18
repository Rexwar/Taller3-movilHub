<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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
    public function update(Request $request, $id)
    {
        // Mensajes de error personalizados para las reglas de validación
        $messages = [
            'email.email' => 'El correo debe ser válido.',
            'email.max' => 'El correo no debe superar los 100 caracteres.',
            'email.unique' => 'El correo ya está registrado.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'name.required' => 'El nombre es obligatorio.',
            'name.min' => 'El nombre debe tener al menos 10 caracteres.',
            'name.max' => 'El nombre no debe superar los 150 caracteres.',
            'birth_date.required' => 'La fecha de nacimiento es obligatoria.',
            'birth_date.date' => 'La fecha de nacimiento debe ser una fecha válida.',
        ];

        // Validar los datos que se reciben
        $validatedData = $request->validate([
            'email' => 'sometimes|required|email|max:100|unique:users',
            'password' => 'sometimes|required|min:8',
            'name' => 'sometimes|required|string|min:10|max:150',
            'birth_date' => 'sometimes|required|date',
        ], $messages);

        // Encontrar el usuario
        $user = User::findOrFail($id);

        // Actualizar los campos proporcionados
        $user->fill($validatedData);

        // Si se proporciona una nueva contraseña, encriptarla
        if ($request->has('password')) {
            $user->password = bcrypt($validatedData['password']);
        }

        $user->save();

        return response()->json($user);
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
