// HBZ Architectural Studio Datasets & Configurations

export const SAMPLE_LEADS = [
  {
    id: 'lead_001',
    name: 'Lord Alistair Sterling',
    phone: 'alistair.sterling@mayfairholding.co.uk',
    source: 'Direct Studio Consultation',
    status: 'Meeting Booked',
    details: 'Complete 4-storey Grade II listed townhouse restoration in Belgravia, London. Seeking monolithic stone staircase and acoustic cedar courtyard.',
    post_id: 'Belgravia Townhouse Scheme',
    notes: 'Site inspection meeting scheduled for next Thursday 11:00 AM with studio director.',
    created_at: new Date(Date.now() - 6 * 86400000).toISOString()
  },
  {
    id: 'lead_002',
    name: 'Dr. Marcus & Eleanor Vance',
    phone: '+44 7911 884210',
    source: 'Calculator: Flooring & Materials',
    status: 'Proposal Sent',
    details: 'Flooring Calculation: Italian Poured Terrazzo (4,200 sq.ft) with 10% wastage allowance. Total Projected Investment: £147,000.',
    post_id: 'Calculator: Flooring Estimator',
    notes: 'Sent formal materials schedule and terrazzo slab samples via courier.',
    created_at: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: 'lead_003',
    name: 'Kenji Takahashi',
    phone: 'k.takahashi@mori-developments.jp',
    source: 'Project Scheme Dossier',
    status: 'New',
    details: 'Commissioning inquiry inspired by Palazzo Molteni Tokyo (Scheme 01). Retail & exhibition flagship in Minami-Aoyama (2,100 m²).',
    post_id: 'p1',
    notes: 'Requires preliminary zoning envelope consultation by mid-November.',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'lead_004',
    name: 'Arch. Helena Rostova',
    phone: 'h.rostova@atelier-rostova.ch',
    source: 'Journal Unlock',
    status: 'Contacted',
    details: 'Journal Monograph Unlock: Comparative Monograph — Structural Steel Framing vs Post-Tensioned Concrete in Contemporary Residential Spans.',
    post_id: 'post1',
    notes: 'Discussed Zurich lakeside residential engineering collaboration.',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 'lead_005',
    name: 'Julian de Vries',
    phone: 'julian@antwerpartfoundation.org',
    source: 'Calculator: Wall Cladding & Acoustics',
    status: 'New',
    details: 'Wall Cladding & Acoustic Estimation: Slatted Acoustic Smoked Oak (3,600 sq.ft) for contemporary sculpture pavilion. Total Projected: £126,000.',
    post_id: 'Calculator: Wall Cladding',
    notes: '',
    created_at: new Date(Date.now() - 12 * 3600000).toISOString()
  }
];

export const SAMPLE_PROJECTS = [
  {
    id: 'p1',
    title: 'Palazzo Molteni Tokyo',
    category: 'Architecture',
    subCategory: 'Retail & Brand',
    location: 'Tokyo, Japan',
    year: '2024 — 2025',
    area: '1,850 m²',
    client: 'Molteni&C SpA',
    materials: 'Cast Concrete, Bronzed Steel, Hand-crafted Ceramic Tile, Hinoki Cypress',
    gridSpan: 'span-col-2',
    heroRatio: '16:9',
    summary: 'A flagship architectural presence in Minami-Aoyama balancing monumental mineral street frontage with contemplative Japanese courtyard gardens.',
    body: 'The Palazzo Molteni Tokyo commission embodies an intentional dialog between European rationalism and Japanese spatial restraint. Standing three levels above a textured brick street plinth in Tokyo’s design district, the building presents calibrated monolithic concrete volumes punctuated by dark patinated bronze glazing mullions. Natural daylight filters deep into the interior through acoustic double-skin facades, illuminating custom millwork and tactile limestone exhibition galleries.',
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&h=1012&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&h=1012&q=85',
        title: 'Monolithic Facade & Civic Street Plinth',
        ratio: '16/9',
        orientation: 'landscape',
        dims: '1800 × 1012 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1080&h=1440&q=85',
        title: 'Triple-Height Light Shaft & Gallery Stair',
        ratio: '3/4',
        orientation: 'portrait',
        dims: '1080 × 1440 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&h=1200&q=85',
        title: 'Bronzed Steel & Hand-Cast Concrete Joinery',
        ratio: '1/1',
        orientation: 'square',
        dims: '1200 × 1200 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=2100&h=900&q=85',
        title: 'Inner Zen Courtyard & Water Reflection Mirror',
        ratio: '21/9',
        orientation: 'panoramic',
        dims: '2100 × 900 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&h=1500&q=85',
        title: 'Upper Floor Tea Lounge & Tatami Alcove',
        ratio: '4/5',
        orientation: 'portrait',
        dims: '1200 × 1500 px'
      }
    ]
  },
  {
    id: 'p2',
    title: 'Meridian Commercial Campus',
    category: 'Architecture',
    subCategory: 'Offices & HQ',
    location: 'London, UK',
    year: '2023 — 2024',
    area: '14,200 m²',
    client: 'Legal & General Capital',
    materials: 'Portland Stone, Exposed Post-Tensioned Concrete, Low-Iron Glazing',
    gridSpan: 'span-standard',
    heroRatio: '1:1',
    summary: 'A 4-block headquarters campus centered on wellness, daylight infiltration, and fluid hybrid collaborative workspaces.',
    body: 'Commissioned as a low-carbon workplace benchmark, the Meridian Campus integrates biophilic lightwells, active vertical circulation, and flexible structural grids that adapt to evolving programmatic demands over decades. The facade incorporates fluted Portland stone pillars that offer passive solar shading while establishing a timeless civic rhythm along the river frontage.',
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&h=1067&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&h=1067&q=85',
        title: 'River Thames Civic Frontage & Shaded Colonnade',
        ratio: '3/2',
        orientation: 'landscape',
        dims: '1600 × 1067 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&h=1350&q=85',
        title: 'Glazed Central Atrium & Suspended Timber Bridges',
        ratio: '2/3',
        orientation: 'portrait',
        dims: '900 × 1350 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&h=1080&q=85',
        title: 'Rooftop Biophilic Garden & London Skyline View',
        ratio: '16/9',
        orientation: 'landscape',
        dims: '1920 × 1080 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1100&h=1100&q=85',
        title: 'Fluted Portland Stone Column Detail & Acoustic Shadow',
        ratio: '1/1',
        orientation: 'square',
        dims: '1100 × 1100 px'
      }
    ]
  },
  {
    id: 'p3',
    title: 'Cedar Hill Residences',
    category: 'Architecture',
    subCategory: 'Residential',
    location: 'Zurich, Switzerland',
    year: '2024',
    area: '4,800 m²',
    client: 'Alpine Living Consortium',
    materials: 'Tactile Larch Screening, Monolithic Dolomite Concrete, Triple-Glazed Timber Frames',
    gridSpan: 'span-row-2',
    heroRatio: '3:4',
    summary: '42-unit architectural residential enclave featuring integrated shared woodland courtyards and passive thermal mass.',
    body: 'Cedar Hill harmonizes tactile timber screening with monolithic cast-concrete structural forms. Every residence frames panoramic alpine views while maintaining exceptional thermal mass and acoustic isolation. Interconnected courtyards harvest rainwater and provide communal garden sanctuaries buffered from the mountain winds.',
    image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1100&h=1466&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1100&h=1466&q=85',
        title: 'Terraced Alpine Cantilevers & Forest Canopy',
        ratio: '3/4',
        orientation: 'portrait',
        dims: '1100 × 1466 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&h=1012&q=85',
        title: 'Great Room Living Space Framing Lake Zurich',
        ratio: '16/9',
        orientation: 'landscape',
        dims: '1800 × 1012 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&h=1200&q=85',
        title: 'Tactile Swiss Larch Joinery & Granite Hearth',
        ratio: '1/1',
        orientation: 'square',
        dims: '1200 × 1200 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&h=850&q=85',
        title: 'Shared Woodland Courtyard & Stone Pathway',
        ratio: '21/9',
        orientation: 'panoramic',
        dims: '2000 × 850 px'
      }
    ]
  },
  {
    id: 'p4',
    title: 'Vauxhall Viaduct Interchange',
    category: 'Architecture',
    subCategory: 'Cultural & Civic',
    location: 'London, UK',
    year: '2022 — 2023',
    area: '8,600 m²',
    client: 'Transport for London & Civic Trust',
    materials: 'Weathering Corten Steel, Recycled Basalt Cobble, Structural Glass',
    gridSpan: 'span-wide',
    heroRatio: '2:1',
    summary: 'Civic structural refurbishment and public pedestrian connector revitalizing historical Victorian railway arches.',
    body: 'A complex civil engineering scheme delivered over live transit lines. The intervention introduced slender weathering-steel cantilevers, illuminated public gathering pockets, and civic permeability beneath the rail viaduct without disruption to daily commuter transit schedules.',
    image_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1800&h=900&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1800&h=900&q=85',
        title: 'Illuminated Victorian Arches & Corten Overpass',
        ratio: '2/1',
        orientation: 'panoramic',
        dims: '1800 × 900 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&h=1200&q=85',
        title: 'Public Amphitheater & Underpass Gathering Pockets',
        ratio: '4/3',
        orientation: 'landscape',
        dims: '1600 × 1200 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&h=1422&q=85',
        title: 'Cantilevered Glass Light Chimney Shaft',
        ratio: '9/16',
        orientation: 'portrait',
        dims: '800 × 1422 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=1200&q=85',
        title: 'Weathered Corten Rivet & Basalt Cobble Joint',
        ratio: '1/1',
        orientation: 'square',
        dims: '1200 × 1200 px'
      }
    ]
  },
  {
    id: 'p5',
    title: 'The Tannery Adaptive Reuse',
    category: 'Architecture',
    subCategory: 'Renovation',
    location: 'Antwerp, Belgium',
    year: '2023',
    area: '3,200 m²',
    client: 'Stad Antwerpen & Creative Guild',
    materials: 'Restored Flemish Brick, Cast Iron Columns, Blackened Steel, Belgian Bluestone',
    gridSpan: 'span-standard',
    heroRatio: '1:1',
    summary: 'Transformation of a 19th-century industrial leather works into modern creative studios, exhibition halls, and archive galleries.',
    body: 'Preserving patinated brickwork, cast-iron columns, and exposed timber trusses while inserting high-performance acoustic envelopes and concealed state-of-the-art climate infrastructure. The central atrium was converted into an open public auditorium connecting local artisans with visiting design researchers.',
    image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&h=1200&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&h=1200&q=85',
        title: 'Restored 19th-Century Industrial Brick Facade',
        ratio: '4/3',
        orientation: 'landscape',
        dims: '1600 × 1200 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&h=1333&q=85',
        title: 'Double-Height Artist Loft & North Skylights',
        ratio: '3/4',
        orientation: 'portrait',
        dims: '1000 × 1333 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&h=1200&q=85',
        title: 'Patinated Cast Iron Column & Flemish Masonry Detail',
        ratio: '1/1',
        orientation: 'square',
        dims: '1200 × 1200 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&h=1080&q=85',
        title: 'Public Auditorium & Exhibition Mezzanine',
        ratio: '16/9',
        orientation: 'landscape',
        dims: '1920 × 1080 px'
      }
    ]
  },
  {
    id: 'p6',
    title: 'Komorebi Tea Pavilion',
    category: 'Architecture',
    subCategory: 'Hospitality',
    location: 'Kyoto, Japan',
    year: '2024 — 2025',
    area: '620 m²',
    client: 'Private Foundation',
    materials: 'Charred Cedar (Shou Sugi Ban), Washi Paper, Hand-hammered Copper, Slate',
    gridSpan: 'span-hero',
    heroRatio: '1:1',
    summary: 'A quiet meditation retreat nestled in bamboo groves, designed to frame morning shadows and seasonal changes.',
    body: 'Every joint was dry-fitted by master carpenters without nails. Slender charred cedar louvers filter the western sun, while water mirrors catch the sky and bounce soft light onto the hand-plastered earthen walls.',
    image_url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1400&h=1400&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1400&h=1400&q=85',
        title: 'Charred Cedar Screen Dissolving into Bamboo Forest',
        ratio: '1/1',
        orientation: 'square',
        dims: '1400 × 1400 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&h=1012&q=85',
        title: 'Water Mirror Reflecting Morning Mist & Copper Roof',
        ratio: '16/9',
        orientation: 'landscape',
        dims: '1800 × 1012 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&h=1350&q=85',
        title: 'Traditional Tearoom Alcove with Washi Screens',
        ratio: '2/3',
        orientation: 'portrait',
        dims: '900 × 1350 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2100&h=900&q=85',
        title: 'Stepping Stones Across Zen Garden Stream',
        ratio: '21/9',
        orientation: 'panoramic',
        dims: '2100 × 900 px'
      }
    ]
  },
  {
    id: 'p7',
    title: 'Keizersgracht Canal House',
    category: 'Interior',
    subCategory: 'Residential',
    location: 'Amsterdam, Netherlands',
    year: '2023',
    area: '780 m²',
    client: 'Private Residence',
    materials: 'French Smoked Oak, Calacatta Viola Marble, Raw Linen, Bronze Ironmongery',
    gridSpan: 'span-row-2',
    heroRatio: '3:4',
    summary: 'A 17th-century canal palace completely restored into a serene, tactile contemporary private gallery home.',
    body: 'The project reconciles strict monumental preservation guidelines with minimalist contemporary living. Heavy structural timber beams were preserved and left raw, paired with seamless micro-cement flooring, bespoke oak cabinetry, and integrated architectural lighting.',
    image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1050&h=1400&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1050&h=1400&q=85',
        title: 'Monumental 17th-Century Canal Facade & Windows',
        ratio: '3/4',
        orientation: 'portrait',
        dims: '1050 × 1400 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&h=1012&q=85',
        title: 'Smoked Oak Salon with Exposed Raw Ceiling Beams',
        ratio: '16/9',
        orientation: 'landscape',
        dims: '1800 × 1012 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&h=1200&q=85',
        title: 'Bookmatched Calacatta Viola Marble Island Detail',
        ratio: '1/1',
        orientation: 'square',
        dims: '1200 × 1200 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&h=1375&q=85',
        title: 'Serene Garden-Facing Bedroom with Linen Drapery',
        ratio: '4/5',
        orientation: 'portrait',
        dims: '1100 × 1375 px'
      }
    ]
  },
  {
    id: 'p8',
    title: 'Son Servera Stone Villa',
    category: 'Architecture',
    subCategory: 'Residential',
    location: 'Mallorca, Spain',
    year: '2024',
    area: '1,100 m²',
    client: 'Private Commission',
    materials: 'Dry-Stacked Mares Stone, Lime Wash, Terrazzo, Weathered Teak',
    gridSpan: 'span-col-2',
    heroRatio: '16:9',
    summary: 'An earthen stone residence carved into the Mediterranean hillside with seamless indoor-outdoor courtyards.',
    body: 'Constructed using traditional dry-stacked limestone quarried on site. Thick thermal walls buffer intense summer heat, framing unhindered vistas of olive orchards and the Balearic Sea.',
    image_url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&h=1080&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&h=1080&q=85',
        title: 'Dry-Stone Cantilever Overlooking Mediterranean Sea',
        ratio: '16/9',
        orientation: 'landscape',
        dims: '1920 × 1080 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&h=1333&q=85',
        title: 'Deep Portico with Mares Stone Pillars & Teak Pergola',
        ratio: '3/4',
        orientation: 'portrait',
        dims: '1000 × 1333 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&h=1200&q=85',
        title: 'Chiseled Limestone & Lime Plaster Wall Texture',
        ratio: '1/1',
        orientation: 'square',
        dims: '1200 × 1200 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&h=850&q=85',
        title: 'Seamless Basalt Water Edge Merging with Balearic Horizon',
        ratio: '21/9',
        orientation: 'panoramic',
        dims: '2000 × 850 px'
      }
    ]
  },
  {
    id: 'p9',
    title: 'Neue National Galerie Pavilions',
    category: 'Architecture',
    subCategory: 'Cultural & Civic',
    location: 'Berlin, Germany',
    year: '2024 — 2025',
    area: '5,400 m²',
    client: 'Stiftung Preußischer Kulturbesitz',
    materials: 'Structural Black Steel, Architectural Terrazzo, Acoustic Tension Fabric, Low-Iron Glass',
    gridSpan: 'span-wide',
    heroRatio: '2:1',
    summary: 'A minimalist steel-and-glass civic pavilion complex dedicated to contemporary sculpture, natural light studies, and cultural performance.',
    body: 'Conceived as an ethereal floating canopy of blackened structural steel, the pavilion hovers above an expansive open glass curtain. The interior achieves complete column-free spans, allowing monumental sculptures to converse directly with the Berlin sky. Underneath, a sunken granite plaza connects public educational ateliers with specialized climate-controlled archiving vaults.',
    image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&h=960&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&h=960&q=85',
        title: 'Crisp Floating Black Steel Roof Above Glass Enclosure',
        ratio: '2/1',
        orientation: 'panoramic',
        dims: '1920 × 960 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=960&h=1280&q=85',
        title: 'Slender Cruciform Steel Columns & Geometric Coffers',
        ratio: '3/4',
        orientation: 'portrait',
        dims: '960 × 1280 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&h=1012&q=85',
        title: 'Vast Column-Free Sculpture Gallery in Daylight',
        ratio: '16/9',
        orientation: 'landscape',
        dims: '1800 × 1012 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=1200&q=85',
        title: 'Hand-Poured Terrazzo Paver & Polished Granite Joint',
        ratio: '1/1',
        orientation: 'square',
        dims: '1200 × 1200 px'
      }
    ]
  },
  {
    id: 'p10',
    title: 'Fjordlys Sanctuary',
    category: 'Architecture',
    subCategory: 'Hospitality',
    location: 'Oslo, Norway',
    year: '2024',
    area: '1,450 m²',
    client: 'Nordic Wilderness Trust',
    materials: 'Charred Pine Shingles, Norwegian Granite, Triple-Insulated Nordic Glass, Raw Felt',
    gridSpan: 'span-hero',
    heroRatio: '1:1',
    summary: 'A remote wilderness spa and research lodge perched above an icy Norwegian fjord, sculpted to blend into rocky topography.',
    body: 'Fjordlys embodies extreme climatic adaptation through vernacular craftsmanship. Blackened pine shingles protect against maritime blizzards, while triple-glazed crystalline envelopes frame northern lights across the water. A central geothermal hearth heats thermal stone baths, cascading down granite terraces into the natural fjord edge.',
    image_url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1800&h=1012&q=85',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1800&h=1012&q=85',
        title: 'Blackened Pine Lodge Floating Over Snow-Covered Fjord',
        ratio: '16/9',
        orientation: 'landscape',
        dims: '1800 × 1012 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=850&h=1511&q=85',
        title: 'Towering Hearth Chimney Rising Through Timber Roof',
        ratio: '9/16',
        orientation: 'portrait',
        dims: '850 × 1511 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&h=1200&q=85',
        title: 'Chiseled Norwegian Granite & Hand-Cut Pine Shingles',
        ratio: '1/1',
        orientation: 'square',
        dims: '1200 × 1200 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&h=850&q=85',
        title: 'Cantilevered Sauna Deck Overhanging Fjord Waters',
        ratio: '21/9',
        orientation: 'panoramic',
        dims: '2000 × 850 px'
      },
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&h=1125&q=85',
        title: 'Sunken Fireside Lounge Wrapped in Wool Felt & Cedar',
        ratio: '4/3',
        orientation: 'landscape',
        dims: '1500 × 1125 px'
      }
    ]
  }
];

export const SAMPLE_POSTS = [
  {
    id: 'b1',
    title: 'Structural Steel vs Post-Tensioned Concrete: Procurement Velocity & Cost in 2026',
    category: 'Technical Briefing',
    date: 'October 2026',
    readTime: '6 min read',
    author: 'Elena Vance • Partner, Engineering Practice',
    excerpt: 'Cost, timeline, and durability trade-offs for commercial mid-rise builds. When a client asks whether to frame in structural steel or post-tensioned concrete, the real answer hinges on craneage restrictions, site logistics, and procurement velocity.',
    body: `The procurement dilemma on restricted metropolitan sites rarely comes down to simple material unit rates. It hinges on craneage swing clearances, municipal street closure licensing, and the contractual lead times of international steel mills in volatile global trade corridors.

## Structural Efficiency & Acoustic Floor Heights

Across fifteen recently delivered European commercial schemes, post-tensioned (PT) concrete consistently slashed floor slab thickness by up to 140mm per level compared to composite steel deck construction. Across eight levels, this structural delta unlocks an entire additional usable storey within municipal height ceilings—fundamentally transforming scheme feasibility for institutional owners.

> “On restricted metropolitan footprints, post-tensioned floor slabs slash structural thickness by up to 140mm per level. Across eight levels, this unlocks an entire additional usable floor plate without breaching municipal height ceilings.”

## Procurement Velocity & Critical Path Analysis

Below six storeys with expansive column grids, structural steel delivers rapid on-site assembly. However, once buildings exceed 24 metres, the vibration damping and deflection limits required for prime corporate and luxury residential occupiers swing the balance decisively toward monolithic PT concrete.

- Steel Procurement Lead Times: 18–26 weeks from mill allocation to site erection.
- Concrete PT Cycle Speed: 7-day floor-to-floor pour cycle with re-usable formwork.
- Slab Depth Differential: 180mm PT slab vs 320mm composite steel beam + deck.
- Embodied Carbon Mitigation: 32% reduction achieved via 50% GGBS cement replacement.

## Contractor Risk Allocation & Supply Buffer

To safeguard developers against holding-cost slippage, HBZ recommends locking mill billets at Stage 3 tender while simultaneously designing PT casting tolerances to accept hybrid precast edge beams and in-situ perimeter ringbeams.`,
    image_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'b2',
    title: 'Navigating Municipal Planning & Approval Timelines: The Critical Path',
    category: 'Field Report',
    date: 'September 2026',
    readTime: '5 min read',
    author: 'Marcus Thorne • Director of Urban Planning',
    excerpt: 'What has changed in statutory approval committees and how to sequence your submission package. Municipal bodies have accelerated digital validation benchmarks, radically reshaping pre-construction milestones.',
    body: `Municipal planning authorities have universally migrated to algorithmic digital validation models. The traditional sequential approach—submitting an entire scheme and awaiting committee determination—now introduces crippling holding costs for developers and institutional funds.

## Critical Path Sequencing for Heritage Contexts

When developing within designated conservation enclaves in London, Paris, or Tokyo, planning authorities scrutinise massing plinths and daylighting far more rigorously than interior fit-outs. Early baseline environmental testing is essential.

> “The key to rapid planning clearance is early statutory alignment on daylight-sunlight envelope envelopes before architectural envelopes are frozen.”

## Structured Engagement & Statutory Protocols

Proactive sequencing of statutory milestones prevents costly revisions during public inquiry phases:

- Pre-Application Consultation: 8-week structured engagement with conservation officers and amenity societies.
- Microclimate & Daylight Analysis: Independent 3D daylight/sunlight BRE tests completed before public hearings.
- Heritage Material Testing: Physical masonry and bronze sample panels erected on-site for conservation officer sign-off.
- Section 106 & Community Infrastructure Levy: Proactive negotiation of public realm contributions to eliminate planning condition delays.

## De-risking Statutory Determination

By embedding environmental mitigation directly into the initial design dossier, approval velocity is accelerated by an average of 4.2 months across statutory planning boards.`,
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'b3',
    title: 'Acoustic Stillness in Monolithic Timber Construction',
    category: 'Material Study',
    date: 'August 2026',
    readTime: '6 min read',
    author: 'Soren Lindqvist • Material Research Fellow',
    excerpt: 'Mass timber offers unparalleled warmth and carbon benefits, but low-frequency acoustic isolation requires meticulous decoupling. Insights from our Swiss residential tests.',
    body: `Cross-Laminated Timber (CLT) is revered for its biophilic warmth, rapid assembly velocity, and carbon sequestration. Yet, timber's inherent lightweight density presents a formidable architectural challenge: low-frequency impact sound transmission.

## The Low-Frequency Acoustic Paradox

Traditional resilient metal channels fail to damp footfall frequencies between 50 and 80 Hertz. True acoustic stillness in contemporary timber architecture demands complete multi-layer elastomeric mass decoupling rather than single-plane dampening.

> “Traditional resilient metal channels fail to damp footfall frequencies between 50 and 80 Hertz. True acoustic silence in timber architecture demands multi-layer elastomeric mass decoupling.”

## Laboratory Benchmarks: Zurich Residential Enclave

During rigorous field testing across our Zurich residential enclave, our material research group developed an entirely dry acoustic buildup that surpasses luxury 5-star hospitality standards without pouring wet screed onto dry timber decks:

- Dry Granulated Cork Sub-Screed: 45mm high-density mineralized cork granules providing mass without moisture.
- Resilient Elastomeric Pads: Isolating perimeter baseplates to halt flanking transmission along vertical CLT walls.
- Impact Sound Level (L'n,w): Measured at 39 dB (exceeding luxury standard of ≤ 44 dB).
- Airborne Sound Insulation (R'w + Ctr): Measured at 58 dB, guaranteeing total conversational privacy.

## Material Durability & Long-Term Creep

Long-term testing confirms that elastomeric granulated cork exhibits less than 0.8% creep deformation over a 30-year lifecycle simulation, providing enduring acoustic isolation for high-value residential schemes.`,
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'b4',
    title: 'The Poetics of Negative Space: Daylighting, Shading, and Thermal Permanence',
    category: 'Monograph',
    date: 'July 2026',
    readTime: '7 min read',
    author: 'HBZ Architectural Studio',
    excerpt: 'Architecture is not merely what is constructed, but the void left behind. A study of light penetration, micro-climatic breezeways, and thermal permanence.',
    body: `In our continuous dialogue with European minimalism and Japanese spatial philosophy, negative space is never an emptiness to be filled. It is an active architectural instrument that governs natural daylight, thermal permanence, and atmospheric stillness.

## The Architectural Void as an Active Instrument

Light does not exist in isolation; it requires deep mineral reveals, textural shadow, and measured aperture proportions to attain tactile weight.

> “Light does not exist in isolation; it requires deep mineral reveals and carefully positioned shadow to attain tactile weight.”

## Thermal Permanence and Natural Breezeways

By carving multi-storey void volumes and lightwells through the centre of private residences and corporate headquarters, we establish natural stack ventilation that cools interior chambers without mechanical HVAC dependencies:

- Deep Recessed Reveals: 450mm exterior aperture recesses that eliminate harsh mid-day summer solar gain.
- Micro-Climatic Courtyards: Water mirrors and shaded stone plinths that pre-cool incoming air by 3.5°C.
- Passive Thermal Storage: Exposed basalt and board-formed concrete slabs that absorb daytime thermal energy and gently release warmth as evening temperatures drop.
- Visual Serenity Index: 92% of occupants reported significantly lower cognitive stress levels in spaces with uncompromised axial sightlines to private courtyard gardens.

## Enduring Spatial Experience

When spatial volume is prioritized over decorative ornament, the building becomes a tranquil sanctuary that gracefully registers the passage of the sun and changing seasons.`,
    image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  }
];

export const HOUSE_CITY_CONFIG = {
  bengaluru: { name: 'Bengaluru', baseFactor: 1.0, parkingPerBay: 220000 },
  hyderabad: { name: 'Hyderabad', baseFactor: 0.96, parkingPerBay: 200000 },
  mumbai:    { name: 'Mumbai / MMR', baseFactor: 1.25, parkingPerBay: 300000 },
  delhi:     { name: 'Delhi NCR', baseFactor: 1.15, parkingPerBay: 260000 },
  chennai:   { name: 'Chennai', baseFactor: 0.98, parkingPerBay: 210000 },
  pune:      { name: 'Pune', baseFactor: 1.04, parkingPerBay: 230000 },
  london:    { name: 'London (UK)', baseFactor: 4.8, parkingPerBay: 950000 },
  global:    { name: 'International / Other', baseFactor: 1.1, parkingPerBay: 250000 }
};

export const HOUSE_PACKAGES = {
  classic: {
    key: 'classic',
    name: 'Classic Standard',
    tagline: 'Reliable Turnkey Construction',
    ratePerSqFt: 2150,
    warranty: '5 Years Structural Warranty',
    steel: 'Fe550 TMT Bars (Kamdhenu / Jindal)',
    cement: 'OPC / PPC 53 Grade (Ultratech / Dalmia)',
    flooring: 'Vitrified Tiles 2×2 ft (Kajaria / Somany)',
    plumbing: 'Concealed CPVC/PVC (Astral / Supreme)',
    electrical: 'Fire-Resistant Copper Wires (Anchor / Havells)',
    paint: 'Tractor Emulsion & Ace Weatherproof',
    features: [
      'Standard RCC Column & SMRF Foundation (up to 5ft)',
      'Solid Concrete Block Masonry (6" ext / 4" int)',
      'Flush Doors with Hardwood Frame & Cylinder Lock',
      '3-Track Powder-Coated Aluminum Sliding Windows',
      'Sintex 1000L Overhead Tank & 4000L Sump Tank'
    ]
  },
  premium: {
    key: 'premium',
    name: 'Premium Executive',
    badge: 'Most Popular',
    tagline: 'Architectural Grade Finishes & Longevity',
    ratePerSqFt: 2750,
    warranty: '10 Years Structural Warranty',
    steel: 'Tata Tiscon / JSW Neosteel Fe550D',
    cement: 'UltraTech Super / ACC Concrete Plus',
    flooring: 'Large Format Vitrified 4×2 ft / Granite Accents',
    plumbing: 'Jaquar / Kohler CP & Sanitaryware',
    electrical: 'Schneider / Legrand Modular with MCB Box',
    paint: 'Asian Paints Royale Luxury Interior & Apex Ultima',
    features: [
      'Teak Wood Main Door Frame & Designer Shutter',
      'Granite Kitchen Countertop with Franke SS Sink',
      'UPVC 3-Track Windows with Mosquito Mesh & Toughened Glass',
      'Dual Waterproofing Treatment & Anti-Termite Guarantee',
      'Concealed Piping for AC, Inverter & Solar Water Heater'
    ]
  },
  royale: {
    key: 'royale',
    name: 'Royale Signature Villa',
    badge: 'Luxury Spec',
    tagline: 'Monolithic Architectural Masterpiece',
    ratePerSqFt: 3850,
    warranty: '15 Years Comprehensive Warranty',
    steel: 'Tata Tiscon Super-Ductile Corrosion-Resistant Fe550D',
    cement: 'UltraTech Weather Plus Hydrophobic Cement',
    flooring: 'Imported Italian Marble / Engineered Solid Hardwood',
    plumbing: 'Grohe / Bravat / Duravit Concealed Wall-Hung',
    electrical: 'Legrand Arteor / Lutron Smart Home Automation',
    paint: 'PU Polish Woodwork & Asian Paints Royale Aspira',
    features: [
      'Double-Height Living Glazing & Thermal-Break Systems',
      'Custom Bespoke Teak / Accoya Joinery Throughout',
      'Concealed VRV / Multi-Split HVAC Ducting Provisions',
      'Rooftop Terrace Landscaping & Pergola Structure',
      'Dedicated HBZ Senior Principal Site Architect Supervision'
    ]
  }
};

export const HOUSE_CURRENCY_RATES = {
  '₹': 1,
  '$': 0.012,
  '£': 0.0095,
  '€': 0.011
};

export const MATERIAL_PRESETS = {
  tiles:    { name: 'Ceramic / Porcelain Tiles', defaultTileL: 4, defaultTileW: 2, tileUnit: 'ft', price: 200, install: 50 },
  marble:   { name: 'Italian Marble Slabs',      defaultTileL: 5, defaultTileW: 3, tileUnit: 'ft', price: 380, install: 90 },
  granite:  { name: 'Granite Stone',             defaultTileL: 3, defaultTileW: 2, tileUnit: 'ft', price: 240, install: 60 },
  wood:     { name: 'Hardwood / Parquet Planks', defaultTileL: 4, defaultTileW: 0.5, tileUnit: 'ft', price: 280, install: 75 },
  vinyl:    { name: 'Luxury Vinyl Tiles (LVT)',  defaultTileL: 3, defaultTileW: 0.6, tileUnit: 'ft', price: 120, install: 35 },
  laminate: { name: 'Laminate Flooring',         defaultTileL: 4, defaultTileW: 0.65, tileUnit: 'ft', price: 105, install: 30 },
  custom:   { name: 'Custom Specification',      defaultTileL: 2, defaultTileW: 2, tileUnit: 'ft', price: 180, install: 45 }
};

export const WALL_MATERIAL_PRESETS = {
  acoustic_slats: {
    name: 'Acoustic Slatted Timber (Fluted Oak / Walnut)',
    desc: 'NRC 0.85 sound absorbing PET felt with genuine wood fluted slats.',
    defaultPanelW: 2,
    defaultPanelH: 10,
    panelUnit: 'ft',
    price: 380,
    install: 95
  },
  porcelain_slab: {
    name: 'Large-Format Porcelain / Sintered Stone Slabs',
    desc: '1200×2800mm slim architectural sintered cladding for monolithic presence.',
    defaultPanelW: 4,
    defaultPanelH: 9.2,
    panelUnit: 'ft',
    price: 450,
    install: 120
  },
  microcement: {
    name: 'Venetian Plaster / Seamless Microcement',
    desc: '3-coat hand-burnished mineral finish with protective matte polyurethane.',
    defaultPanelW: 0,
    defaultPanelH: 0,
    panelUnit: 'ft',
    price: 240,
    install: 70
  },
  drywall_partition: {
    name: 'Acoustic Stud Partition & Rockwool Insulation',
    desc: '70mm C-stud steel frame, 50mm acoustic insulation, acoustic plasterboard.',
    defaultPanelW: 4,
    defaultPanelH: 8,
    panelUnit: 'ft',
    price: 190,
    install: 65
  },
  mineral_paint: {
    name: 'Architectural Mineral / Lime Wash Paint',
    desc: 'Breathable, ultra-matte mineral silicate coating (2 coats + primer).',
    defaultPanelW: 0,
    defaultPanelH: 0,
    panelUnit: 'ft',
    price: 85,
    install: 35
  },
  custom: {
    name: 'Custom Wall Specification',
    desc: 'Bespoke architectural wall cladding or partition system.',
    defaultPanelW: 2,
    defaultPanelH: 10,
    panelUnit: 'ft',
    price: 300,
    install: 80
  }
};
