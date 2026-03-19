<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function register(Request $req)
    {
        $data = $req->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ]);

        $data['password'] = bcrypt($data['password']);

        User::create($data);

        return response()->json([
            'message' => 'Successfully Registered'
        ], 201);
    }


public function login(Request $request)
{
    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // create token
    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json([
        'message' => 'Logi Doen',
        'user' => $user,
        'token' => $token
    ]);
}
}