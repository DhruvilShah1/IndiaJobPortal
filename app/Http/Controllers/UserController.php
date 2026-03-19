<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
public function getAll(Request $request){
    $limit = $request->get('limit', 1); 
    $users = User::with(['about', 'experience', 'profile'])->paginate($limit); 

    return response()->json([
        'message' => 'Fetch Successfully',
        'data' => $users
    ]);
}


     public function getParticularUser($id){
$users = User::with(['about', 'experience', 'profile'])->where('id',$id)->first();

        return response()->json([
            'message' => 'Fetch Successfully',
            'data' => $users
        ]);
    }
}
