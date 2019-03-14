@extends('layout-info')

@section('pageTitle', 'Lithium List - terms')

@section('cssLinks')
    <link rel="stylesheet" href="{{ url(mix('/css/terms.css')) }}">
@endsection

@section('jsLinks')
    <script defer src="{{ url(mix('/js/terms.js')) }}"></script>
@endsection

@section('content')
<div class="title-main-cont">
    <div class="title-main-outer">
        Lithium List licence agreement
    </div>
</div>
<div class="section-cont">
    <div class="section-outer">
        <div class="para">
            This agreement (the <strong>Agreement</strong>) is made between Indysoft Pty Ltd ACN 612 045 002 (a company incorporated in Australia) (<strong>Indysoft</strong>) and the Licensee (the <strong>Licensee</strong>). By downloading, installing, copying, accessing and/or using Lithium List, the Licensee agrees to be bound by the terms and conditions of this Agreement.
        </div>
        <div class="para">
            Indysoft may alter this Agreement at any time. The altered version, which immediately becomes the Licensee&#39;s agreement with Indysoft, will be the version published on the Website.
        </div>
    </div>
</div>
<div class="section-cont grey">
    <div class="section-outer">
        <div class="title">
            1. Definitions
        </div>
        <div class="para">
            <strong>License</strong> means the license granted by Indysoft on the terms of this Agreement.
        </div>
        <div class="para">
            <strong>Lithium List</strong> means the sortable and swipeable list javascript plugin owned by Indysoft and licensed to third parties.
        </div>
        <div class="para">
            <strong>Price List</strong> means the pricing for the relevant licence type, as set out on the Website at the time of purchase.
        </div>
        <div class="para">
            <strong>Website</strong> means all web pages and related material available via the domain name lithiumlist.com.
        </div>
    </div>
</div>
<div class="section-cont">
    <div class="section-outer">
        <div class="title">
            2. Intellectual property rights
        </div>
        <div class="para">
            The Licensee ackowledges that:
        </div>
        <div class="para">
            <ol type="a">
                <li>
                    Indysoft owns all intellectual property rights in and over Lithium List. Nothing in this Agreement operates to assign or transfer any intellectual property rights from Indysoft to you.
                </li>
                <li>
                    The structure, organisation and code of Lithium List are valuable to Indysoft. The Lithium List logo and, if applicable, trademarks are proprietary to Indysoft and protected by law.
                </li>
            </ol>
        </div>
    </div>
</div>
@endsection