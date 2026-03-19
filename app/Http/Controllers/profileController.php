<?php

namespace App\Http\Controllers;

use App\Models\profile;
use Illuminate\Http\Request;

class profileController extends Controller
{
    public function CreateProfile(Request $req){
        $data = $req->validate([
            'location'=>'required',
                        'city'=>'required',
                                    'postcode'=>'required',
                                    'show_experience' => 'required',
                                    'pronouns' =>'required',
                                    'Headline' => 'required' ,
    'avatar' => 'required',
    'cover_image' => 'required',

                                
        ]);


        if ($req->hasFile('avatar')) {
    $data['avatar'] = $req->file('avatar')->store('avatars', 'public');
}

if ($req->hasFile('cover_image')) {
    $data['cover_image'] = $req->file('cover_image')->store('covers', 'public');
}


        $profile = profile::updateOrCreate(
            ['user_id' => $req->user_id], 
            $data
        );

        
        return response()->json([
            'message' => 'Profile saved successfully',
            'profile' => $profile,
        ]);

    }

   public function getProfile($user_id)
{
    $profile = profile::where('user_id', $user_id)->first();

    if ($profile) {
        return response()->json([
            'success' => true,
            'profile' => $profile
        ], 200); 
    }

    return response()->json([
        'success' => false,
        'error' => 'profile not found'
    ], 404);
}

}
