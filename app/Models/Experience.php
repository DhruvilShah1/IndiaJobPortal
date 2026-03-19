<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'employment_type',
        'company',
        'current',
        'start_date',
        'end_date',
        'location',
        'location_type',
        'description',
        'skills',
    ];

    protected $casts = [
        'skills' => 'array',
        'current' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}