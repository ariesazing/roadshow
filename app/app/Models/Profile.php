<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'last_name',
        'first_name',
        'middle_initial',
        'email',
        'phone_number',
        'birthdate',
    ];
}
