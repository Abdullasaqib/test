-- Populate pricing_tiers with 12-week aligned revolutionary tiers
INSERT INTO pricing_tiers (name, tier_type, program, monthly_price, upfront_price, duration_months, features, is_active, display_order)
VALUES
-- Revolution tier (entry point, not "free")
('Start the Revolution', 'revolution', 'all', 0, 0, 3, 
 '{"certification": true, "sample_projects": true, "ai_coach_limited": true, "resources": true, "tank": false, "journey": false, "live_classes": false, "daily_messages": 5, "description": "Prove you are ready for the revolution"}'::jsonb, 
 true, 1),

-- Standard: 12-week pricing
('Standard Founder', 'standard', 'all', 150, 450, 3, 
 '{"certification": true, "journey": true, "ai_coach": true, "tank": true, "live_classes": true, "feedback": "72h", "daily_messages": 50, "description": "Full 12-week founder journey"}'::jsonb, 
 true, 2),

-- Premium: 12-week pricing  
('Premium Founder', 'premium', 'all', 200, 600, 3, 
 '{"certification": true, "journey": true, "ai_coach": true, "tank": true, "live_classes": true, "small_group": true, "portfolio_review": true, "feedback": "48h", "daily_messages": 100, "description": "Accelerated growth with group sessions"}'::jsonb, 
 true, 3),

-- VIP: 12-week pricing
('VIP Founder', 'vip', 'all', 400, 1200, 3, 
 '{"certification": true, "journey": true, "ai_coach": true, "tank": true, "live_classes": true, "small_group": true, "portfolio_review": true, "mentor_1on1": "4hrs/mo", "college_guidance": true, "investor_intros": true, "feedback": "24h", "daily_messages": -1, "description": "1-on-1 mentorship and investor connections"}'::jsonb, 
 true, 4)
ON CONFLICT DO NOTHING;