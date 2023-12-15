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
        // Validar los datos que se reciben
        $validatedData = $request->validate([
            'email' => 'sometimes|required|email',
            'password' => 'sometimes|required',
            'name' => 'sometimes|required',
            'birth_date' => 'sometimes|required|date',
        ]);

        // Encontrar el usuario
        $user = User::findOrFail($id);

        // Actualizar solo los campos proporcionados
        if ($request->has('email')) {
            $user->email = $validatedData['email'];
        }
        if ($request->has('password')) {
            $user->password = bcrypt($validatedData['password']); // Encriptar contraseña
        }
        if ($request->has('name')) {
            $user->name = $validatedData['name'];
        }
        if ($request->has('birth_date')) {
            $user->birth_date = $validatedData['birth_date'];
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
