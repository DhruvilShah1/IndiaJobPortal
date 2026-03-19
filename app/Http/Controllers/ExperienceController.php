<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Experience;

class ExperienceController extends Controller
{
    // Store new experience
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'employment_type' => 'required|string|max:50',
            'company' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'current' => 'boolean',
            'skills' => 'nullable|array|max:5',
        ]);

        $experience = Experience::create($request->all());

        return response()->json([
            'success' => true,
            'experience' => $experience
        ], 201);
    }

    // Update existing experience
    public function update(Request $request, $id)
    {
        $experience = Experience::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'employment_type' => 'required|string|max:50',
            'company' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'current' => 'boolean',
            'skills' => 'nullable|array|max:5',
        ]);

        $experience->update($request->all());

        return response()->json([
            'success' => true,
            'experience' => $experience
        ]);
    }

    // Get experiences by user
    public function getByUser($user_id)
    {
        $experiences = Experience::where('user_id', $user_id)->get();

        return response()->json([
            'success' => true,
            'experiences' => $experiences
        ]);
    }

    // Delete experience
    public function destroy($id)
    {
        $experience = Experience::findOrFail($id);
        $experience->delete();

        return response()->json([
            'success' => true,
            'message' => 'Experience deleted'
        ]);
    }
}